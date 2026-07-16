const db = require('../config/db');

const findByPeriode = (periode, callback) => {
    // periode format expected: 'YYYY-MM'
    const query = `
        SELECT 
            t.id_nasabah, t.nama_nasabah, t.rt, t.rw, t.keterangan_wilayah,
            t.saldo_awal, t.saldo_kotor, t.jumlah_ambil, t.status, t.tanggal_ambil,
            COALESCE(t.saldo_akhir_rekap, (t.saldo_awal + (t.saldo_kotor * IF(t.nama_nasabah = 'Kas Bank Sampah', 1.00, 0.90)) - t.jumlah_ambil)) AS saldo_akhir
        FROM (
            SELECT 
                n.id AS id_nasabah,
                n.nama AS nama_nasabah,
                n.rt,
                n.rw,
                n.keterangan_wilayah,
                -- 1. Saldo Awal (Dari rekap bulan ini, atau rekap terakhir periode sebelumnya)
                COALESCE(
                    (SELECT s.saldo_awal FROM setoran_nasabah s WHERE s.id_nasabah = n.id AND DATE_FORMAT(s.periode, '%Y-%m') = ? LIMIT 1),
                    (SELECT s.saldo_akhir FROM setoran_nasabah s WHERE s.id_nasabah = n.id AND s.periode < STR_TO_DATE(CONCAT(?, '-01'), '%Y-%m-%d') ORDER BY s.periode DESC LIMIT 1),
                    0
                ) AS saldo_awal,
                -- 2. Saldo Kotor (Dahulukan hitungan dinamis dari detail_setoran harian, fallback ke rekap tersimpan, lalu 0)
                COALESCE(
                    (SELECT SUM(d.jumlah_kg * h.harga) FROM detail_setoran d JOIN harga_sampah h ON d.id_harga_sampah = h.id WHERE d.id_nasabah = n.id AND DATE_FORMAT(d.tanggal, '%Y-%m') = ?),
                    (SELECT s.saldo_kotor FROM setoran_nasabah s WHERE s.id_nasabah = n.id AND DATE_FORMAT(s.periode, '%Y-%m') = ? LIMIT 1),
                    0
                ) AS saldo_kotor,
                -- 3. Jumlah Ambil
                COALESCE(
                    (SELECT s.jumlah_ambil FROM setoran_nasabah s WHERE s.id_nasabah = n.id AND DATE_FORMAT(s.periode, '%Y-%m') = ? LIMIT 1),
                    0
                ) AS jumlah_ambil,
                -- 4. Status
                COALESCE(
                    (SELECT s.status FROM setoran_nasabah s WHERE s.id_nasabah = n.id AND DATE_FORMAT(s.periode, '%Y-%m') = ? LIMIT 1),
                    'DITABUNG'
                ) AS status,
                -- 5. Saldo Akhir Rekap (jika sudah ada rekap di database)
                (SELECT s.saldo_akhir FROM setoran_nasabah s WHERE s.id_nasabah = n.id AND DATE_FORMAT(s.periode, '%Y-%m') = ? LIMIT 1) AS saldo_akhir_rekap,
                -- 6. Tanggal Ambil
                (SELECT s.tanggal_ambil FROM setoran_nasabah s WHERE s.id_nasabah = n.id AND DATE_FORMAT(s.periode, '%Y-%m') = ? LIMIT 1) AS tanggal_ambil
            FROM nasabah n
        ) t
        ORDER BY t.nama_nasabah ASC
    `;
    db.query(query, [periode, periode, periode, periode, periode, periode, periode, periode], callback);
};

const create = ({ id_nasabah, periode, saldo_awal, saldo_kotor, jumlah_ambil, saldo_akhir, status }, callback) => {
    db.query(`
        INSERT INTO setoran_nasabah 
            (id_nasabah, periode, saldo_awal, saldo_kotor, jumlah_ambil, saldo_akhir, status, tanggal_ambil)
        VALUES (?, ?, ?, ?, ?, ?, ?, IF(? > 0, CURRENT_DATE(), NULL))
        ON DUPLICATE KEY UPDATE
            saldo_awal = VALUES(saldo_awal),
            saldo_kotor = VALUES(saldo_kotor),
            jumlah_ambil = VALUES(jumlah_ambil),
            saldo_akhir = VALUES(saldo_akhir),
            status = VALUES(status),
            tanggal_ambil = IF(VALUES(jumlah_ambil) > 0, COALESCE(tanggal_ambil, CURRENT_DATE()), NULL)
    `, [id_nasabah, periode, saldo_awal || 0, saldo_kotor || 0, jumlah_ambil || 0, saldo_akhir || 0, status || 'DITABUNG', jumlah_ambil || 0], callback);
};

const update = (id, { saldo_awal, saldo_kotor, jumlah_ambil, saldo_akhir, status }, callback) => {
    db.query(`
        UPDATE setoran_nasabah
        SET saldo_awal = ?, saldo_kotor = ?, jumlah_ambil = ?, saldo_akhir = ?, status = ?,
            tanggal_ambil = IF(? > 0, COALESCE(tanggal_ambil, CURRENT_DATE()), NULL)
        WHERE id = ?
    `, [saldo_awal, saldo_kotor, jumlah_ambil, saldo_akhir, status, jumlah_ambil || 0, id], callback);
};

const syncRekap = (idNasabah, dateStr, callback) => {
    if (!idNasabah) return callback(null);
    let year, month;
    if (dateStr instanceof Date) {
        year = dateStr.getFullYear();
        month = String(dateStr.getMonth() + 1).padStart(2, '0');
    } else {
        const parts = String(dateStr).split('-');
        if (parts.length >= 2) {
            year = parts[0];
            month = parts[1];
        } else {
            const d = new Date(dateStr);
            year = d.getFullYear();
            month = String(d.getMonth() + 1).padStart(2, '0');
        }
    }
    const periodeMonth = `${year}-${month}`; // 'YYYY-MM'
    const periodeDay = `${periodeMonth}-01`; // 'YYYY-MM-01'

    // 1. Cek apakah rekap sudah ada di setoran_nasabah
    db.query(
        'SELECT id, saldo_awal, jumlah_ambil FROM setoran_nasabah WHERE id_nasabah = ? AND periode = ?',
        [idNasabah, periodeDay],
        (err, rows) => {
            if (err) return callback(err);
            if (rows.length === 0) {
                // Rekap belum dibuat untuk bulan ini, tidak perlu disinkronkan
                return callback(null);
            }

            const rekap = rows[0];

            // Ambil nama nasabah untuk membedakan Kas Bank Sampah
            db.query('SELECT nama FROM nasabah WHERE id = ?', [idNasabah], (nasabahErr, nasabahRows) => {
                if (nasabahErr) return callback(nasabahErr);
                if (nasabahRows.length === 0) return callback(new Error('Nasabah tidak ditemukan'));

                const isKasBankSampah = nasabahRows[0].nama === 'Kas Bank Sampah';

                // 2. Hitung jumlah saldo_kotor baru dari detail_setoran harian
                db.query(
                    `SELECT COALESCE(SUM(d.jumlah_kg * h.harga), 0) AS total_kotor 
                     FROM detail_setoran d 
                     JOIN harga_sampah h ON d.id_harga_sampah = h.id 
                     WHERE d.id_nasabah = ? AND DATE_FORMAT(d.tanggal, '%Y-%m') = ?`,
                    [idNasabah, periodeMonth],
                    (err, sumRows) => {
                        if (err) return callback(err);
                        const newKotor = parseFloat(sumRows[0].total_kotor || 0);
                        const saldoAwal = parseFloat(rekap.saldo_awal || 0);
                        const jumlahAmbil = parseFloat(rekap.jumlah_ambil || 0);
                        const netSetoran = isKasBankSampah ? newKotor : newKotor * 0.90;
                        const newSaldoAkhir = saldoAwal + netSetoran - jumlahAmbil;

                        // 3. Update setoran_nasabah
                        db.query(
                            'UPDATE setoran_nasabah SET saldo_kotor = ?, saldo_akhir = ? WHERE id = ?',
                            [newKotor, newSaldoAkhir, rekap.id],
                            callback
                        );
                    }
                );
            });
        }
    );
};

module.exports = { findByPeriode, create, update, syncRekap };
