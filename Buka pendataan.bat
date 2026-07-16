@echo off
title Bank Sampah Digital - Memulai...

:: Nyalain XAMPP (MySQL)
echo Menghidupkan MySQL...
start "" "C:\xampp\xampp_start.exe"
timeout /t 4 /nobreak > nul

:: Jalankan backend Node.js
echo Menjalankan backend...
cd /d "D:\Coolyeah\KKN\Digitalisasi Pendataan Bank Sampah Suryo RW 10\app"
start "Backend Bank Sampah" cmd /k "node server.js"
timeout /t 3 /nobreak > nul

:: Buka browser
echo Membuka aplikasi...
start "" "http://localhost:3000"

echo.
echo Aplikasi Bank Sampah Digital sudah berjalan!
echo Jangan tutup jendela cmd yang terbuka.