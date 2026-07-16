const db = require('../config/db');

const findAll = (callback) => {
    db.query(`
        SELECT l.id, COALESCE(u.nama, r.nama_warga) AS nama_warga,
               COALESCE(u.rt, r.rt) AS rt, COALESCE(u.rw, r.rw) AS rw,
               h.kategori, h.nama_sampah, l.berat_kg, l.total_harga,
               l.poin_didapat, l.id_request, l.tanggal_setor, r.catatan
        FROM laporan_setoran l
        LEFT JOIN users u         ON l.id_warga  = u.id
        LEFT JOIN request_jemput r ON l.id_request = r.id
        LEFT JOIN harga_sampah h  ON l.id_sampah  = h.id
        ORDER BY l.id DESC
    `, callback);
};

const create = ({ id_sampah, berat_kg, total_harga, id_warga, id_request, poin_didapat }, callback) => {
    db.query(
        'INSERT INTO laporan_setoran (id_sampah, berat_kg, total_harga, id_warga, id_request, poin_didapat) VALUES (?, ?, ?, ?, ?, ?)',
        [id_sampah, berat_kg, total_harga, id_warga || null, id_request || null, poin_didapat],
        callback
    );
};

const countByRequest = (id_request, callback) => {
    db.query('SELECT COUNT(*) AS c FROM laporan_setoran WHERE id_request = ?', [id_request], callback);
};

module.exports = { findAll, create, countByRequest };
