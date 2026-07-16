const db = require('../config/db');

const findByPeriode = (periode, callback) => {
    // periode format expected: 'YYYY-MM'
    const query = `
        SELECT 
            t.id_nasabah, t.nama_nasabah, t.rt, t.rw, t.keterangan_wilayah,
            t.saldo_awal, t.saldo_kotor, t.jumlah_ambil, t.status,
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
                -- 2. Saldo Kotor (Dari rekap bulan ini, atau hitung dari detail harian)
                COALESCE(
                    (SELECT s.saldo_kotor FROM setoran_nasabah s WHERE s.id_nasabah = n.id AND DATE_FORMAT(s.periode, '%Y-%m') = ? LIMIT 1),
                    (SELECT SUM(d.jumlah_kg * h.harga) FROM detail_setoran d JOIN harga_sampah h ON d.id_harga_sampah = h.id WHERE d.id_nasabah = n.id AND DATE_FORMAT(d.tanggal, '%Y-%m') = ?),
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
                (SELECT s.saldo_akhir FROM setoran_nasabah s WHERE s.id_nasabah = n.id AND DATE_FORMAT(s.periode, '%Y-%m') = ? LIMIT 1) AS saldo_akhir_rekap
            FROM nasabah n
        ) t
        ORDER BY t.nama_nasabah ASC
    `;
    db.query(query, [periode, periode, periode, periode, periode, periode, periode], callback);
};

const create = ({ id_nasabah, periode, saldo_awal, saldo_kotor, jumlah_ambil, saldo_akhir, status }, callback) => {
    db.query(`
        INSERT INTO setoran_nasabah 
            (id_nasabah, periode, saldo_awal, saldo_kotor, jumlah_ambil, saldo_akhir, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            saldo_awal = VALUES(saldo_awal),
            saldo_kotor = VALUES(saldo_kotor),
            jumlah_ambil = VALUES(jumlah_ambil),
            saldo_akhir = VALUES(saldo_akhir),
            status = VALUES(status)
    `, [id_nasabah, periode, saldo_awal || 0, saldo_kotor || 0, jumlah_ambil || 0, saldo_akhir || 0, status || 'DITABUNG'], callback);
};

const update = (id, { saldo_awal, saldo_kotor, jumlah_ambil, saldo_akhir, status }, callback) => {
    db.query(`
        UPDATE setoran_nasabah
        SET saldo_awal = ?, saldo_kotor = ?, jumlah_ambil = ?, saldo_akhir = ?, status = ?
        WHERE id = ?
    `, [saldo_awal, saldo_kotor, jumlah_ambil, saldo_akhir, status, id], callback);
};

module.exports = { findByPeriode, create, update };
