const express = require('express');
const router = express.Router();
const {
    getDetailSetoran, createDetailSetoran, updateDetailSetoran, deleteDetailSetoran,
    getSetoranNasabah, createSetoranNasabah,
    getSetoranPengepul, createSetoranPengepul, deleteSetoranPengepul
} = require('../controllers/laporanController');

router.get('/laporan', getDetailSetoran); // Backward compatibility fallback

router.get('/detail-setoran', getDetailSetoran);
router.post('/detail-setoran', createDetailSetoran);
router.put('/detail-setoran/:id', updateDetailSetoran);
router.delete('/detail-setoran/:id', deleteDetailSetoran);

router.get('/setoran-nasabah', getSetoranNasabah);
router.post('/setoran-nasabah', createSetoranNasabah);

router.get('/setoran-pengepul', getSetoranPengepul);
router.post('/setoran-pengepul', createSetoranPengepul);
router.delete('/setoran-pengepul/:id', deleteSetoranPengepul);

module.exports = router;
