const Nasabah = require('../models/nasabahModel');

const getNasabah = (req, res) => {
    Nasabah.findAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getNasabahStats = (req, res) => {
    Nasabah.findStats((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0] || { total: 0, warga_rw10: 0, warga_luar: 0 });
    });
};

const createNasabah = (req, res) => {
    const { nama, rt, rw, keterangan_wilayah } = req.body;
    Nasabah.create({ nama, rt, rw, keterangan_wilayah }, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ success: true, message: 'Nasabah berhasil ditambahkan' });
    });
};

const updateNasabah = (req, res) => {
    const { nama, rt, rw, keterangan_wilayah } = req.body;
    Nasabah.update(req.params.id, { nama, rt, rw, keterangan_wilayah }, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Nasabah berhasil diperbarui' });
    });
};

const deleteNasabah = (req, res) => {
    Nasabah.remove(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Nasabah berhasil dihapus' });
    });
};

const getNasabahHistory = (req, res) => {
    Nasabah.getHistory(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!results) return res.status(404).json({ success: false, message: 'Nasabah tidak ditemukan' });
        res.json(results);
    });
};

module.exports = { getNasabah, getNasabahStats, createNasabah, updateNasabah, deleteNasabah, getNasabahHistory };
