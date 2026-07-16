const express = require('express');
const router = express.Router();
const { getHarga, createHarga, updateHarga, deleteHarga } = require('../controllers/hargaController');

router.get('/harga', getHarga);
router.post('/harga', createHarga);
router.put('/harga/:id', updateHarga);
router.delete('/harga/:id', deleteHarga);

module.exports = router;
