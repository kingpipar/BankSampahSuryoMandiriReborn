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

        db.query(`
            SELECT d.id, d.tanggal, d.jumlah_kg, h.nama_sampah, h.harga, (d.jumlah_kg * h.harga) AS total, h.satuan, d.keterangan
            FROM detail_setoran d
            JOIN harga_sampah h ON d.id_harga_sampah = h.id
            WHERE d.id_nasabah = ?
            ORDER BY d.tanggal DESC
        `, [id], (err, deposits) => {
            if (err) return callback(err);

            db.query(`
                SELECT periode, saldo_awal, saldo_kotor, jumlah_ambil, saldo_akhir, status
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
