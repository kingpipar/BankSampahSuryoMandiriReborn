const db = require('../config/db');

const findByPeriode = (periode, callback) => {
    // 1. Coba cari dari rekap tabel setoran_pengepul
    db.query(`
        SELECT sp.id, sp.id_harga_sampah, sp.periode, sp.jumlah_kg, h.satuan, sp.harga_satuan, sp.keterangan,
               h.nama_sampah, (sp.jumlah_kg * sp.harga_satuan) AS total
        FROM setoran_pengepul sp
        JOIN harga_sampah h ON sp.id_harga_sampah = h.id
        WHERE DATE_FORMAT(sp.periode, '%Y-%m') = ?
        ORDER BY h.nama_sampah ASC
    `, [periode], (err, results) => {
        if (err) return callback(err);
        
        // 2. Jika ada data rekap di setoran_pengepul, kembalikan langsung
        if (results && results.length > 0) {
            return callback(null, results);
        }
        
        // 3. Jika kosong (seperti Juli), kalkulasi dinamis dari detail_setoran harian nasabah
        db.query(`
            SELECT 
                NULL AS id,
                h.id AS id_harga_sampah,
                MAX(d.tanggal) AS periode,
                SUM(d.jumlah_kg) AS jumlah_kg,
                h.satuan,
                h.harga AS harga_satuan,
                SUM(d.jumlah_kg * h.harga) AS total,
                IF(d.keterangan = 'DIBELI WARGA', 'DIBELI WARGA', NULL) AS keterangan,
                h.nama_sampah
            FROM detail_setoran d
            JOIN harga_sampah h ON d.id_harga_sampah = h.id
            WHERE DATE_FORMAT(d.tanggal, '%Y-%m') = ?
            GROUP BY h.id, h.nama_sampah, h.harga, h.satuan, IF(d.keterangan = 'DIBELI WARGA', 'DIBELI WARGA', NULL)
            ORDER BY h.nama_sampah ASC
        `, [periode], callback);
    });
};

const create = ({ id_harga_sampah, periode, jumlah_kg, harga_satuan, keterangan }, callback) => {
    db.query(`
        INSERT INTO setoran_pengepul 
            (id_harga_sampah, periode, jumlah_kg, harga_satuan, keterangan)
        VALUES (?, ?, ?, ?, ?)
    `, [id_harga_sampah, periode, jumlah_kg, harga_satuan, keterangan || null], callback);
};

const update = (id, { id_harga_sampah, periode, jumlah_kg, harga_satuan, keterangan }, callback) => {
    db.query(`
        UPDATE setoran_pengepul
        SET id_harga_sampah = ?, periode = ?, jumlah_kg = ?, harga_satuan = ?, keterangan = ?
        WHERE id = ?
    `, [id_harga_sampah, periode, jumlah_kg, harga_satuan, keterangan, id], callback);
};

const remove = (id, callback) => {
    db.query('DELETE FROM setoran_pengepul WHERE id = ?', [id], callback);
};

module.exports = { findByPeriode, create, update, remove };
