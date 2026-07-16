const express = require('express');
const router = express.Router();
const { getNasabah, getNasabahStats, createNasabah, updateNasabah, deleteNasabah, getNasabahHistory } = require('../controllers/nasabahController');

router.get('/users/stats', getNasabahStats); // Fallback so we don't break frontend pages if they call /api/users/stats
router.get('/nasabah/stats', getNasabahStats);
router.get('/nasabah/:id/history', getNasabahHistory);
router.get('/nasabah', getNasabah);
router.get('/users', getNasabah); // Fallback so we don't break frontend pages if they call /api/users
router.post('/nasabah', createNasabah);
router.post('/users', createNasabah); // Fallback
router.put('/nasabah/:id', updateNasabah);
router.put('/users/:id', updateNasabah); // Fallback
router.delete('/nasabah/:id', deleteNasabah);
router.delete('/users/:id', deleteNasabah); // Fallback

module.exports = router;
