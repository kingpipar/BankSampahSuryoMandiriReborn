const db = require('../config/db');

const findAll = (periode, callback) => {
    let query = `
        SELECT d.id, d.id_nasabah, d.id_harga_sampah, d.jumlah_kg, d.tanggal, d.keterangan,
               n.nama AS nama_nasabah, n.rt, n.rw,
               h.nama_sampah, h.harga, h.satuan, (d.jumlah_kg * h.harga) AS total_harga
        FROM detail_setoran d
        JOIN nasabah n ON d.id_nasabah = n.id
        JOIN harga_sampah h ON d.id_harga_sampah = h.id
    `;
    const params = [];
    if (periode) {
        query += ` WHERE DATE_FORMAT(d.tanggal, '%Y-%m') = ?`;
        params.push(periode);
    }
    query += ` ORDER BY d.tanggal DESC, d.id DESC`;

    db.query(query, params, callback);
};

const create = ({ id_nasabah, id_harga_sampah, jumlah_kg, tanggal, keterangan }, callback) => {
    db.query(
        'INSERT INTO detail_setoran (id_nasabah, id_harga_sampah, jumlah_kg, tanggal, keterangan) VALUES (?, ?, ?, ?, ?)',
        [id_nasabah, id_harga_sampah, jumlah_kg, tanggal || new Date().toISOString().slice(0, 10), keterangan || null],
        callback
    );
};

const update = (id, { id_nasabah, id_harga_sampah, jumlah_kg, tanggal, keterangan }, callback) => {
    db.query(`
        UPDATE detail_setoran
        SET id_nasabah = ?, id_harga_sampah = ?, jumlah_kg = ?, tanggal = ?, keterangan = ?
        WHERE id = ?
    `, [id_nasabah, id_harga_sampah, jumlah_kg, tanggal || new Date().toISOString().slice(0, 10), keterangan || null, id], callback);
};

const remove = (id, callback) => {
    db.query('DELETE FROM detail_setoran WHERE id = ?', [id], callback);
};

const getById = (id, callback) => {
    db.query('SELECT id_nasabah, tanggal FROM detail_setoran WHERE id = ?', [id], (err, rows) => {
        if (err) return callback(err);
        if (rows.length === 0) return callback(null, null);
        callback(null, rows[0]);
    });
};

module.exports = { findAll, create, update, remove, getById };
