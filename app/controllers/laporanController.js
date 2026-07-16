const DetailSetoran = require('../models/detailSetoranModel');
const SetoranNasabah = require('../models/setoranNasabahModel');
const SetoranPengepul = require('../models/setoranPengepulModel');

// ── Detail Setoran (Setoran Harian) ───────────────────────────
const getDetailSetoran = (req, res) => {
    const { periode } = req.query;
    DetailSetoran.findAll(periode, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const createDetailSetoran = (req, res) => {
    const { id_nasabah, id_harga_sampah, jumlah_kg, tanggal, keterangan } = req.body;
    if (!id_nasabah || !id_harga_sampah || !jumlah_kg) {
        return res.status(400).json({ success: false, message: 'Nasabah, jenis sampah, dan jumlah berat wajib diisi!' });
    }
    DetailSetoran.create({ id_nasabah, id_harga_sampah, jumlah_kg: parseFloat(jumlah_kg), tanggal, keterangan }, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ success: true, message: 'Setoran harian berhasil ditambahkan' });
    });
};

const updateDetailSetoran = (req, res) => {
    const { id_nasabah, id_harga_sampah, jumlah_kg, tanggal, keterangan } = req.body;
    if (!id_nasabah || !id_harga_sampah || !jumlah_kg) {
        return res.status(400).json({ success: false, message: 'Nasabah, jenis sampah, dan jumlah berat wajib diisi!' });
    }
    DetailSetoran.update(req.params.id, { id_nasabah, id_harga_sampah, jumlah_kg: parseFloat(jumlah_kg), tanggal, keterangan }, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Setoran harian berhasil diperbarui' });
    });
};

const deleteDetailSetoran = (req, res) => {
    DetailSetoran.remove(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Setoran harian berhasil dihapus' });
    });
};

// ── Setoran Nasabah (Rekap Keuangan Nasabah Bulanan) ──────────
const getSetoranNasabah = (req, res) => {
    let { periode } = req.query;
    if (!periode) {
        periode = new Date().toISOString().slice(0, 7); // Default YYYY-MM
    }
    SetoranNasabah.findByPeriode(periode, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const createSetoranNasabah = (req, res) => {
    const { id_nasabah, periode, saldo_awal, saldo_kotor, jumlah_ambil, saldo_akhir, status } = req.body;
    if (!id_nasabah || !periode) {
        return res.status(400).json({ success: false, message: 'Nasabah dan periode wajib diisi!' });
    }
    SetoranNasabah.create({ id_nasabah, periode, saldo_awal, saldo_kotor, jumlah_ambil, saldo_akhir, status }, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ success: true, message: 'Rekap setoran nasabah berhasil ditambahkan' });
    });
};

// ── Setoran Pengepul (Rekap Setoran Pengepul Bulanan) ─────────
const getSetoranPengepul = (req, res) => {
    let { periode } = req.query;
    if (!periode) {
        periode = new Date().toISOString().slice(0, 7); // Default YYYY-MM
    }
    SetoranPengepul.findByPeriode(periode, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const createSetoranPengepul = (req, res) => {
    const { id_harga_sampah, periode, jumlah_kg, satuan, harga_satuan, keterangan } = req.body;
    if (!id_harga_sampah || !periode || !jumlah_kg || !harga_satuan) {
        return res.status(400).json({ success: false, message: 'Data setoran pengepul tidak lengkap!' });
    }
    SetoranPengepul.create({ id_harga_sampah, periode, jumlah_kg: parseFloat(jumlah_kg), satuan, harga_satuan: parseFloat(harga_satuan), keterangan }, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ success: true, message: 'Setoran pengepul berhasil ditambahkan' });
    });
};

const deleteSetoranPengepul = (req, res) => {
    SetoranPengepul.remove(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Setoran pengepul berhasil dihapus' });
    });
};

module.exports = {
    getDetailSetoran, createDetailSetoran, updateDetailSetoran, deleteDetailSetoran,
    getSetoranNasabah, createSetoranNasabah,
    getSetoranPengepul, createSetoranPengepul, deleteSetoranPengepul
};
