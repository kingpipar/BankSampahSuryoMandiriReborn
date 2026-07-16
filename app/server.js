const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');

// Inisialisasi koneksi database saat startup
require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// ── Sajikan file statis frontend ──────────────────────────────
app.use(express.static(path.join(__dirname, '../views')));

// ── API Routes ────────────────────────────────────────────────
app.use('/api', require('./routes/statsRoutes'));
app.use('/api', require('./routes/hargaRoutes'));
app.use('/api', require('./routes/laporanRoutes'));
app.use('/api', require('./routes/nasabahRoutes'));

// ── Jalankan server ───────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
