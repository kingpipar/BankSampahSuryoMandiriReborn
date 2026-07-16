# Petunjuk Instalasi & Menjalankan Proyek Bank Sampah Digital RW 10

Proyek ini telah dikonfigurasi agar dapat berjalan **100% offline** (tanpa koneksi internet). Seluruh aset gaya CSS dan pustaka eksternal (seperti jsPDF untuk cetak laporan) sudah diunduh dan disimpan secara lokal.

---

## 🛠️ Persyaratan Sistem

Pastikan perangkat Anda sudah terpasang:
1. **Node.js** (Versi 16 atau lebih baru)
2. **MySQL Database Server** (XAMPP / Laragon / MySQL Workbench)

---

## 💻 Langkah Instalasi

### 1. Konfigurasi Environment (`.env`)
Sesuaikan file `.env` di dalam folder `backend` jika konfigurasi MySQL Anda berbeda:
```env
DB_NAME=database bank sampah
DB_USER=root
DB_PASS=
DB_HOST=localhost
PORT=3000
```

### 2. Instalasi Dependensi Backend
Buka PowerShell / Command Prompt, arahkan ke folder `backend`, lalu jalankan:
```bash
cd backend
npm install
```

### 3. Instalasi & Kompilasi CSS Frontend (Tailwind Offline)
Aset CSS sudah dikompilasi secara lokal. Jika Anda ingin melakukan perubahan pada gaya tampilan (styling), instal dependensi frontend dan jalankan compiler:
1. Buka terminal baru dan arahkan ke folder `frontend`.
2. Jalankan instalasi:
   ```bash
   cd frontend
   npm install
   ```
3. Kompilasi gaya tampilan Tailwind CSS:
   - **Kompilasi Sekali (Build):**
     ```bash
     npm run build:css
     ```
   - **Pemantauan Otomatis (Watch Mode saat Development):**
     ```bash
     npm run watch:css
     ```

---

## 🚀 Menjalankan Aplikasi

1. Nyalakan service **Apache** dan **MySQL** di control panel XAMPP/Laragon Anda.
2. Jalankan server Node.js:
   ```bash
   cd backend
   node server.js
   ```
3. Buka browser Anda dan akses aplikasi di:
   `http://localhost:3000`

---

## 📄 Fitur Utama
- **Dashboard Utama:** Ringkasan total nasabah, berat sampah masuk, saldo kas bank sampah (nasabah id=64), dan total uang di bendahara.
- **Cetak Laporan Bulanan (PDF):** Cetak Laporan Setoran Nasabah dan Setoran Pengepul langsung ke format PDF secara offline dari Dashboard.
- **Data Nasabah:** Kelola data nasabah (tambah, edit, hapus) dengan keterangan wilayah.
- **Harga Sampah:** Kelola harga realtime sampah per kilogram.
- **Input Setoran:** Formulir pencatatan setoran harian nasabah beserta histori setorannya.
