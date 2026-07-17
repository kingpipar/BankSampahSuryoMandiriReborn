const db = require('../config/db');

const findAll = (callback) => {
    db.query('SELECT * FROM nasabah ORDER BY id ASC', callback);
};

const findById = (id, callback) => {
    db.query('SELECT * FROM nasabah WHERE id = ?', [id], callback);
};

const create = ({ nama, rt, rw, keterangan_wilayah }, callback) => {
    db.query(
        'INSERT INTO nasabah (nama, rt, rw, keterangan_wilayah, tanggal_daftar) VALUES (?, ?, ?, ?, CURDATE())',
        [nama, rt || null, rw || null, keterangan_wilayah || null],
        callback
    );
};

const update = (id, { nama, rt, rw, keterangan_wilayah }, callback) => {
    db.query(
        'UPDATE nasabah SET nama = ?, rt = ?, rw = ?, keterangan_wilayah = ? WHERE id = ?',
        [nama, rt || null, rw || null, keterangan_wilayah || null, id],
        callback
    );
};

const remove = (id, callback) => {
    db.query('DELETE FROM nasabah WHERE id = ?', [id], callback);
};

const findStats = (callback) => {
    db.query(`
        SELECT 
            COUNT(*) AS total,
            SUM(rt IS NOT NULL AND rt != '') AS warga_rw10,
            SUM(rt IS NULL OR rt = '') AS warga_luar
        FROM nasabah
    `, callback);
};

const getHistory = (id, callback) => {
    db.query('SELECT * FROM nasabah WHERE id = ?', [id], (err, nasabahRes) => {
        if (err) return callback(err);
        if (nasabahRes.length === 0) return callback(null, null);

        const nasabah = nasabahRes[0];

        if (nasabah.nama === 'Kas Administrasi 10%') {
            // Kalkulasi rekap bulanan Kas Administrasi 10% secara dinamis
            db.query(`
                SELECT 
                    DATE_FORMAT(periode, '%Y-%m') AS monthStr,
                    COALESCE(SUM(saldo_kotor * 0.10), 0) AS total_admin
                FROM setoran_nasabah
                WHERE id_nasabah NOT IN (SELECT id FROM nasabah WHERE nama IN ('Kas Bank Sampah', 'Kas Administrasi 10%'))
                GROUP BY monthStr
                ORDER BY monthStr ASC
            `, (err, adminRows) => {
                if (err) return callback(err);

                db.query(`
                    SELECT 
                        DATE_FORMAT(periode, '%Y-%m') AS monthStr,
                        saldo_awal,
                        jumlah_ambil,
                        saldo_akhir,
                        status,
                        tanggal_ambil,
                        periode
                    FROM setoran_nasabah
                    WHERE id_nasabah = ?
                    ORDER BY periode ASC
                `, [id], (err, withdrawRows) => {
                    if (err) return callback(err);

                    const now = new Date();
                    let maxYear = now.getFullYear();
                    let maxMonth = now.getMonth();

                    // Pastikan mencakup data uji masa depan jika ada
                    adminRows.forEach(r => {
                        const parts = r.monthStr.split('-');
                        const y = parseInt(parts[0]);
                        const m = parseInt(parts[1]) - 1;
                        if (y > maxYear || (y === maxYear && m > maxMonth)) {
                            maxYear = y;
                            maxMonth = m;
                        }
                    });

                    withdrawRows.forEach(r => {
                        const parts = r.monthStr.split('-');
                        const y = parseInt(parts[0]);
                        const m = parseInt(parts[1]) - 1;
                        if (y > maxYear || (y === maxYear && m > maxMonth)) {
                            maxYear = y;
                            maxMonth = m;
                        }
                    });

                    const startYear = 2026;
                    const startMonth = 5; // June (0-based: 5)

                    let tempY = startYear;
                    let tempM = startMonth;

                    let prevSaldoAkhir = 1971929; // Saldo awal bawaan Juni 2026
                    const rekap = [];

                    while (tempY < maxYear || (tempY === maxYear && tempM <= maxMonth)) {
                        const mStr = `${tempY}-${String(tempM + 1).padStart(2, '0')}`;
                        const periodeDay = `${mStr}-01`;

                        const adminRow = adminRows.find(r => r.monthStr === mStr);
                        const monthAdmin = adminRow ? parseFloat(adminRow.total_admin) : 0;

                        const wRow = withdrawRows.find(r => r.monthStr === mStr);
                        const wAmbil = wRow ? parseFloat(wRow.jumlah_ambil) : 0;
                        const wStatus = wRow ? wRow.status : (wAmbil > 0 ? 'DIAMBIL' : 'DITABUNG');
                        const wTanggal = wRow ? wRow.tanggal_ambil : null;

                        const saldoAwal = prevSaldoAkhir;
                        const saldoKotor = 0;
                        const saldoAkhir = saldoAwal + monthAdmin - wAmbil;

                        rekap.push({
                            periode: periodeDay,
                            saldo_awal: saldoAwal,
                            saldo_kotor: saldoKotor,
                            jumlah_ambil: wAmbil,
                            saldo_akhir: saldoAkhir,
                            status: wStatus,
                            tanggal_ambil: wTanggal
                        });

                        prevSaldoAkhir = saldoAkhir;

                        tempM++;
                        if (tempM > 11) {
                            tempM = 0;
                            tempY++;
                        }
                    }

                    rekap.reverse(); // Terbaru di atas
                    callback(null, { nasabah, deposits: [], rekap });
                });
            });
            return;
        }

        db.query(`
            SELECT d.id, d.tanggal, d.jumlah_kg, h.nama_sampah, h.harga, (d.jumlah_kg * h.harga) AS total, h.satuan, d.keterangan
            FROM detail_setoran d
            JOIN harga_sampah h ON d.id_harga_sampah = h.id
            WHERE d.id_nasabah = ?
            ORDER BY d.tanggal DESC
        `, [id], (err, deposits) => {
            if (err) return callback(err);

            db.query(`
                SELECT periode, saldo_awal, saldo_kotor, jumlah_ambil, saldo_akhir, status, tanggal_ambil
                FROM setoran_nasabah
                WHERE id_nasabah = ?
                ORDER BY periode DESC
            `, [id], (err, rekap) => {
                if (err) return callback(err);

                callback(null, { nasabah, deposits, rekap });
            });
        });
    });
};

module.exports = { findAll, findById, create, update, remove, findStats, getHistory };
