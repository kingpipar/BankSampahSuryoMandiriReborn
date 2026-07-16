const db = require('../config/db');

const findAll = (callback) => {
    db.query('SELECT * FROM harga_sampah ORDER BY id DESC', callback);
};

const findById = (id, callback) => {
    db.query('SELECT harga FROM harga_sampah WHERE id = ?', [id], callback);
};

const findByNama = (nama_sampah, callback) => {
    db.query('SELECT id FROM harga_sampah WHERE nama_sampah = ? LIMIT 1', [nama_sampah], callback);
};

const create = ({ nama_sampah, harga, satuan }, callback) => {
    db.query(
        'INSERT INTO harga_sampah (nama_sampah, harga, satuan) VALUES (?, ?, ?)',
        [nama_sampah, harga, satuan || 'KG'],
        callback
    );
};

const update = (id, { nama_sampah, harga, satuan }, callback) => {
    db.query(
        'UPDATE harga_sampah SET nama_sampah = ?, harga = ?, satuan = ? WHERE id = ?',
        [nama_sampah, harga, satuan || 'KG', id],
        callback
    );
};

const remove = (id, callback) => {
    db.query('DELETE FROM harga_sampah WHERE id = ?', [id], callback);
};

module.exports = { findAll, findById, findByNama, create, update, remove };
