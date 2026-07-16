const db = require('../config/db');

const getSummary = (callback) => {
    db.query(`
        SELECT 
            (SELECT COUNT(*) FROM nasabah) AS total_nasabah,
            (SELECT COALESCE(SUM(jumlah_kg), 0) FROM detail_setoran) AS total_berat,
            (SELECT COALESCE(saldo_akhir, 0) FROM setoran_nasabah WHERE id_nasabah = 64 ORDER BY periode DESC LIMIT 1) AS kas_bank_sampah,
            (
                SELECT 
                    (SELECT COALESCE(SUM(s.saldo_akhir), 0) FROM setoran_nasabah s WHERE s.id IN (SELECT MAX(id) FROM setoran_nasabah GROUP BY id_nasabah)) 
                    + 1971929 
                    + 
                    (SELECT COALESCE(SUM(s.saldo_kotor * 0.10), 0) FROM setoran_nasabah s WHERE s.id_nasabah != 64)
            ) AS total_uang_bendahara
    `, callback);
};

module.exports = { getSummary };
