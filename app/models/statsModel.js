const db = require('../config/db');

const getSummary = (callback) => {
    db.query(`
        SELECT 
            (SELECT COUNT(*) FROM nasabah) AS total_nasabah,
            (SELECT COALESCE(SUM(jumlah_kg), 0) FROM detail_setoran) AS total_berat,
            (SELECT COALESCE(saldo_akhir, 0) FROM setoran_nasabah WHERE id_nasabah = (SELECT id FROM nasabah WHERE nama = 'Kas Bank Sampah') ORDER BY periode DESC LIMIT 1) AS kas_bank_sampah,
            (
                SELECT 
                    (SELECT COALESCE(SUM(s.saldo_akhir), 0) FROM setoran_nasabah s WHERE s.id IN (SELECT MAX(id) FROM setoran_nasabah GROUP BY id_nasabah) AND s.id_nasabah NOT IN (SELECT id FROM nasabah WHERE nama = 'Kas Administrasi 10%')) 
                    + 1971929 
                    + 
                    (SELECT COALESCE(SUM(s.saldo_kotor * 0.10), 0) FROM setoran_nasabah s WHERE s.id_nasabah NOT IN (SELECT id FROM nasabah WHERE nama IN ('Kas Bank Sampah', 'Kas Administrasi 10%')))
                    -
                    (SELECT COALESCE(SUM(s.jumlah_ambil), 0) FROM setoran_nasabah s WHERE s.id_nasabah IN (SELECT id FROM nasabah WHERE nama = 'Kas Administrasi 10%'))
            ) AS total_uang_bendahara
    `, callback);
};

module.exports = { getSummary };
