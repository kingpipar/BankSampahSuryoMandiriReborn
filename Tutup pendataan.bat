@echo off
title Bank Sampah Digital - Menutup...

:: Tutup backend Node.js
echo Menutup backend...
taskkill /FI "WINDOWTITLE eq Backend Bank Sampah" /T /F > nul 2>&1
taskkill /IM "node.exe" /F > nul 2>&1

:: Tunggu sebentar
timeout /t 2 /nobreak > nul

:: Stop XAMPP dengan benar
echo Menghentikan MySQL...
start "" "C:\xampp\xampp_stop.exe"
timeout /t 3 /nobreak > nul

echo.
echo Aplikasi Bank Sampah Digital sudah ditutup dengan aman.
echo Jendela ini akan menutup otomatis dalam 3 detik...
timeout /t 3 /nobreak > nul