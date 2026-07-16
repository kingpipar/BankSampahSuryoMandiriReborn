const Stats = require('../models/statsModel');

const getStats = (req, res) => {
    Stats.getSummary((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        const data = results[0] || {};
        res.json({
            total_nasabah:        data.total_nasabah        || 0,
            total_warga:          data.total_nasabah        || 0, // Fallback
            total_berat:          data.total_berat          || 0,
            kas_bank_sampah:      data.kas_bank_sampah      || 0,
            total_kas:            data.kas_bank_sampah      || 0, // Fallback
            total_uang_bendahara: data.total_uang_bendahara || 0
        });
    });
};

module.exports = { getStats };
