const Harga = require('../models/hargaModel');

const getHarga = (req, res) => {
    Harga.findAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const createHarga = (req, res) => {
    const { nama_sampah, harga, satuan } = req.body;
    Harga.create({ nama_sampah, harga: parseInt(harga), satuan }, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ success: true, message: 'Data berhasil ditambahkan' });
    });
};

const updateHarga = (req, res) => {
    const { nama_sampah, harga, satuan } = req.body;
    Harga.update(req.params.id, { nama_sampah, harga: parseInt(harga), satuan }, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Data berhasil diperbarui' });
    });
};

const deleteHarga = (req, res) => {
    Harga.remove(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Data berhasil dihapus' });
    });
};

module.exports = { getHarga, createHarga, updateHarga, deleteHarga };
