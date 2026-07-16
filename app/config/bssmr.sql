-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2026 at 09:51 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bssmr`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_setoran`
--

CREATE TABLE `detail_setoran` (
  `id` int(11) NOT NULL,
  `id_nasabah` int(11) NOT NULL,
  `id_harga_sampah` int(11) NOT NULL,
  `jumlah_kg` decimal(10,2) NOT NULL COMMENT 'Berat sampah dalam KG',
  `tanggal` date NOT NULL DEFAULT curdate(),
  `keterangan` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Input harian setoran sampah nasabah (buku bantu digital)';

-- --------------------------------------------------------

--
-- Table structure for table `harga_sampah`
--

CREATE TABLE `harga_sampah` (
  `id` int(11) NOT NULL,
  `nama_sampah` varchar(100) NOT NULL,
  `harga` int(11) NOT NULL COMMENT 'Harga per KG dalam Rupiah',
  `satuan` varchar(10) NOT NULL DEFAULT 'KG'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Master daftar harga sampah per KG';

--
-- Dumping data for table `harga_sampah`
--

INSERT INTO `harga_sampah` (`id`, `nama_sampah`, `harga`, `satuan`) VALUES
(1, 'Besi', 3500, 'KG'),
(2, 'Kaleng & Seng', 2000, 'KG'),
(3, 'Aluminium', 15000, 'KG'),
(4, 'Kardus', 1800, 'KG'),
(5, 'Duplek', 1000, 'KG'),
(6, 'Arsip', 2100, 'KG'),
(7, 'Koran', 3000, 'KG'),
(8, 'Plastik Kresek', 1000, 'KG'),
(9, 'Botol Plastik PET', 2500, 'KG'),
(10, 'Gembosan', 300, 'KG'),
(11, 'Emberan Warna', 1800, 'KG'),
(12, 'Plastik Kerasan', 800, 'KG'),
(13, 'Botol Kaca', 400, 'KG'),
(14, 'Aki', 5000, 'BJ'),
(15, 'Jelantah', 5000, 'LTR');

-- --------------------------------------------------------

--
-- Table structure for table `nasabah`
--

CREATE TABLE `nasabah` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `rt` varchar(10) DEFAULT NULL COMMENT 'Kosongkan jika nasabah luar wilayah',
  `rw` varchar(10) DEFAULT NULL COMMENT 'Kosongkan jika nasabah luar wilayah',
  `keterangan_wilayah` varchar(100) DEFAULT NULL COMMENT 'Isi jika nasabah luar wilayah, misal: RW09, RW11',
  `tanggal_daftar` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Master data nasabah bank sampah';

--
-- Dumping data for table `nasabah`
--

INSERT INTO `nasabah` (`id`, `nama`, `rt`, `rw`, `keterangan_wilayah`, `tanggal_daftar`) VALUES
(1, 'Nita', '34', '10', NULL, '2026-07-13'),
(2, 'Danu (St. Theresia)', '34', '10', NULL, '2026-07-13'),
(3, 'Anti', '34', '10', NULL, '2026-07-13'),
(4, 'Endang Burhan', '34', '10', NULL, '2026-07-13'),
(5, 'Bu Koestandar', '34', '10', NULL, '2026-07-13'),
(6, 'Nurjanah', '34', '10', NULL, '2026-07-13'),
(7, 'Nurul', '34', '10', NULL, '2026-07-13'),
(8, 'Bu Nina Slamet', '34', '10', NULL, '2026-07-13'),
(9, 'Cani', '34', '10', NULL, '2026-07-13'),
(10, 'Anung P', '34', '10', NULL, '2026-07-13'),
(11, 'Anang', '34', '10', NULL, '2026-07-13'),
(12, 'Banjar', '34', '10', NULL, '2026-07-13'),
(13, 'SD Suryo 1', '34', '10', NULL, '2026-07-13'),
(14, 'Nico Surya A', '34', '10', NULL, '2026-07-13'),
(15, 'Dono', '34', '10', NULL, '2026-07-13'),
(16, 'Agus S', '34', '10', NULL, '2026-07-13'),
(17, 'Andri', '34', '10', NULL, '2026-07-13'),
(18, 'Endro S/Narti', '34', '10', NULL, '2026-07-13'),
(19, 'Oscar', '34', '10', NULL, '2026-07-13'),
(20, 'Ana', '34', '10', NULL, '2026-07-13'),
(21, 'Afif', '34', '10', NULL, '2026-07-13'),
(22, 'Ibu Yuana', '34', '10', NULL, '2026-07-13'),
(23, 'Gitra', '34', '10', NULL, '2026-07-13'),
(24, 'Atik Godod', '35', '10', NULL, '2026-07-13'),
(25, 'Sri Wistowo', '35', '10', NULL, '2026-07-13'),
(26, 'Ibu Budi', '35', '10', NULL, '2026-07-13'),
(27, 'Pak Crhis', '35', '10', NULL, '2026-07-13'),
(28, 'Bu Yani', '35', '10', NULL, '2026-07-13'),
(29, 'Utari / Yordan', '35', '10', NULL, '2026-07-13'),
(30, 'Bu Nurma', '35', '10', NULL, '2026-07-13'),
(31, 'Tituk (Bu Pomo)', '35', '10', NULL, '2026-07-13'),
(32, 'Sudarmi Indarto', '35', '10', NULL, '2026-07-13'),
(33, 'Bu Maryati', '35', '10', NULL, '2026-07-13'),
(34, 'Dewi Cakra', '35', '10', NULL, '2026-07-13'),
(35, 'Lurina', '35', '10', NULL, '2026-07-13'),
(36, 'Rama', '35', '10', NULL, '2026-07-13'),
(37, 'Ibu Sri Hanto', '35', '10', NULL, '2026-07-13'),
(38, 'Elita', '36', '10', NULL, '2026-07-13'),
(39, 'Bu Unang', '36', '10', NULL, '2026-07-13'),
(40, 'Herlambang', '36', '10', NULL, '2026-07-13'),
(41, 'Budi Prast', '36', '10', NULL, '2026-07-13'),
(42, 'Bu Yati Sutiyono', '36', '10', NULL, '2026-07-13'),
(43, 'Rivan', '36', '10', NULL, '2026-07-13'),
(44, 'Bu Kendardi', '36', '10', NULL, '2026-07-13'),
(45, 'Okta', '36', '10', NULL, '2026-07-13'),
(46, 'Yana', '36', '10', NULL, '2026-07-13'),
(47, 'Danik', '36', '10', NULL, '2026-07-13'),
(48, 'Fatimah', '36', '10', NULL, '2026-07-13'),
(49, 'Sakini', '36', '10', NULL, '2026-07-13'),
(50, 'Opan', '36', '10', NULL, '2026-07-13'),
(51, 'Rema', '36', '10', NULL, '2026-07-13'),
(52, 'Bu Ningsih/Nanda', '36', '10', NULL, '2026-07-13'),
(53, 'Suci', '36', '10', NULL, '2026-07-13'),
(54, 'Endang Hadi', '36', '10', NULL, '2026-07-13'),
(55, 'Ari', '36', '10', NULL, '2026-07-13'),
(56, 'Purwanti', '36', '10', NULL, '2026-07-13'),
(57, 'Bu Rusman', NULL, NULL, 'RW09', '2026-07-13'),
(58, 'Bu Wiryono', NULL, NULL, 'RW09', '2026-07-13'),
(59, 'Nia Nagan', NULL, NULL, 'Luar Wilayah', '2026-07-13'),
(60, 'Bu Anik Rus', NULL, NULL, 'RW11', '2026-07-13'),
(61, 'Hoho (Gamelan)', NULL, NULL, 'Luar Wilayah', '2026-07-13'),
(62, 'Yuni', NULL, NULL, 'RW11', '2026-07-13'),
(63, 'Dody', NULL, NULL, 'RW11', '2026-07-13'),
(64, 'Kas Bank Sampah', NULL, '10', NULL, '2026-07-13'),
(65, 'Kas RW 10', NULL, '10', NULL, '2026-07-13'),
(66, 'Remaja RW10 SYD', NULL, '10', NULL, '2026-07-13');

-- --------------------------------------------------------

--
-- Table structure for table `setoran_nasabah`
--

CREATE TABLE `setoran_nasabah` (
  `id` int(11) NOT NULL,
  `id_nasabah` int(11) NOT NULL,
  `periode` date NOT NULL COMMENT 'Tanggal periode, misal: 2026-06-01',
  `saldo_awal` decimal(12,2) NOT NULL DEFAULT 0.00 COMMENT 'Saldo akhir dari periode sebelumnya',
  `saldo_kotor` decimal(12,2) NOT NULL DEFAULT 0.00 COMMENT 'Total nilai setor sebelum dipotong admin 10%',
  `jumlah_ambil` decimal(12,2) NOT NULL DEFAULT 0.00 COMMENT 'Jumlah yang diambil nasabah',
  `saldo_akhir` decimal(12,2) NOT NULL DEFAULT 0.00 COMMENT 'Saldo bersih akhir (2) setelah ambil, disimpan untuk periode berikutnya',
  `status` enum('DITABUNG','DIAMBIL') NOT NULL DEFAULT 'DITABUNG'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Rekap laporan keuangan nasabah per periode bulanan';

--
-- Dumping data for table `setoran_nasabah`
--

INSERT INTO `setoran_nasabah` (`id`, `id_nasabah`, `periode`, `saldo_awal`, `saldo_kotor`, `jumlah_ambil`, `saldo_akhir`, `status`) VALUES
(1, 1, '2026-06-07', 230093.00, 17150.00, 0.00, 245528.00, 'DITABUNG'),
(2, 2, '2026-06-07', 330097.00, 0.00, 0.00, 330097.00, 'DITABUNG'),
(3, 3, '2026-06-07', 81448.00, 0.00, 0.00, 81448.00, 'DITABUNG'),
(4, 4, '2026-06-07', 162315.00, 7400.00, 0.00, 168975.00, 'DITABUNG'),
(5, 5, '2026-06-07', 119457.00, 0.00, 0.00, 119457.00, 'DITABUNG'),
(6, 6, '2026-06-07', 475053.00, 204320.00, 0.00, 658941.00, 'DITABUNG'),
(7, 7, '2026-06-07', 47871.00, 0.00, 0.00, 47871.00, 'DITABUNG'),
(8, 8, '2026-06-07', 7470.00, 0.00, 0.00, 7470.00, 'DITABUNG'),
(9, 9, '2026-06-07', 413646.00, 25720.00, 0.00, 436794.00, 'DITABUNG'),
(10, 10, '2026-06-07', 992584.00, 54410.00, 0.00, 1041553.00, 'DITABUNG'),
(11, 11, '2026-06-07', 340114.00, 14780.00, 0.00, 353416.00, 'DITABUNG'),
(12, 12, '2026-06-07', 3852.00, 0.00, 0.00, 3852.00, 'DITABUNG'),
(13, 13, '2026-06-07', 1571056.00, 0.00, 0.00, 1571056.00, 'DITABUNG'),
(14, 14, '2026-06-07', 586254.00, 0.00, 0.00, 586254.00, 'DITABUNG'),
(15, 15, '2026-06-07', 162133.00, 33740.00, 0.00, 192499.00, 'DITABUNG'),
(16, 16, '2026-06-07', 46501.00, 0.00, 0.00, 46501.00, 'DITABUNG'),
(17, 17, '2026-06-07', 3996.00, 0.00, 0.00, 3996.00, 'DITABUNG'),
(18, 18, '2026-06-07', 12089.00, 0.00, 0.00, 12089.00, 'DITABUNG'),
(19, 19, '2026-06-07', 283437.00, 0.00, 0.00, 283437.00, 'DITABUNG'),
(20, 20, '2026-06-07', 58876.00, 0.00, 0.00, 58876.00, 'DITABUNG'),
(21, 21, '2026-06-07', 42939.00, 0.00, 0.00, 42939.00, 'DITABUNG'),
(22, 22, '2026-06-07', 21452.00, 7100.00, 0.00, 27842.00, 'DITABUNG'),
(23, 23, '2026-06-07', 6428.00, 2050.00, 0.00, 8273.00, 'DITABUNG'),
(24, 24, '2026-06-07', 162401.00, 10030.00, 0.00, 171428.00, 'DITABUNG'),
(25, 25, '2026-06-07', 53033.00, 0.00, 0.00, 53033.00, 'DITABUNG'),
(26, 26, '2026-06-07', 178657.00, 5080.00, 0.00, 183229.00, 'DITABUNG'),
(27, 27, '2026-06-07', 240008.00, 0.00, 0.00, 240008.00, 'DITABUNG'),
(28, 28, '2026-06-07', 1316669.00, 84460.00, 0.00, 1392683.00, 'DITABUNG'),
(29, 29, '2026-06-07', 180167.00, 0.00, 0.00, 180167.00, 'DITABUNG'),
(30, 30, '2026-06-07', 181107.00, 0.00, 0.00, 181107.00, 'DITABUNG'),
(31, 31, '2026-06-07', 501477.00, 0.00, 0.00, 501477.00, 'DITABUNG'),
(32, 32, '2026-06-07', 28828.00, 0.00, 0.00, 28828.00, 'DITABUNG'),
(33, 33, '2026-06-07', 54.00, 0.00, 0.00, 54.00, 'DITABUNG'),
(34, 34, '2026-06-07', 26073.00, 0.00, 0.00, 26073.00, 'DITABUNG'),
(35, 35, '2026-06-07', 17829.00, 0.00, 0.00, 17829.00, 'DITABUNG'),
(36, 36, '2026-06-07', 348570.00, 38500.00, 0.00, 383220.00, 'DITABUNG'),
(37, 37, '2026-06-07', 15507.00, 0.00, 0.00, 15507.00, 'DITABUNG'),
(38, 38, '2026-06-07', 510007.00, 0.00, 0.00, 510007.00, 'DITABUNG'),
(39, 39, '2026-06-07', 271216.00, 0.00, 0.00, 271216.00, 'DITABUNG'),
(40, 40, '2026-06-07', 450930.00, 29630.00, 0.00, 477597.00, 'DITABUNG'),
(41, 41, '2026-06-07', 182457.00, 0.00, 0.00, 182457.00, 'DITABUNG'),
(42, 42, '2026-06-07', 0.00, 0.00, 0.00, 0.00, 'DITABUNG'),
(43, 43, '2026-06-07', 50947.00, 0.00, 0.00, 50947.00, 'DITABUNG'),
(44, 44, '2026-06-07', 429667.00, 15380.00, 0.00, 443509.00, 'DITABUNG'),
(45, 45, '2026-06-07', 66.00, 0.00, 0.00, 66.00, 'DITABUNG'),
(46, 46, '2026-06-07', 401316.00, 20140.00, 0.00, 419442.00, 'DITABUNG'),
(47, 47, '2026-06-07', 336231.00, 18440.00, 0.00, 352827.00, 'DITABUNG'),
(48, 48, '2026-06-07', 202680.00, 0.00, 0.00, 202680.00, 'DITABUNG'),
(49, 49, '2026-06-07', 79914.00, 0.00, 0.00, 79914.00, 'DITABUNG'),
(50, 50, '2026-06-07', 172126.00, 0.00, 0.00, 172126.00, 'DITABUNG'),
(51, 51, '2026-06-07', 4166.00, 0.00, 0.00, 4166.00, 'DITABUNG'),
(52, 52, '2026-06-07', 10413.00, 0.00, 0.00, 10413.00, 'DITABUNG'),
(53, 53, '2026-06-07', 3150.00, 0.00, 0.00, 3150.00, 'DITABUNG'),
(54, 54, '2026-06-07', 1350.00, 0.00, 0.00, 1350.00, 'DITABUNG'),
(55, 55, '2026-06-07', 21042.00, 25080.00, 0.00, 43614.00, 'DITABUNG'),
(56, 56, '2026-06-07', 10377.00, 0.00, 0.00, 10377.00, 'DITABUNG'),
(57, 57, '2026-06-07', 23436.00, 0.00, 0.00, 23436.00, 'DITABUNG'),
(58, 58, '2026-06-07', 7344.00, 0.00, 0.00, 7344.00, 'DITABUNG'),
(59, 59, '2026-06-07', 3600.00, 0.00, 0.00, 3600.00, 'DITABUNG'),
(60, 60, '2026-06-07', 161630.00, 0.00, 0.00, 161630.00, 'DITABUNG'),
(61, 61, '2026-06-07', 22743.00, 0.00, 0.00, 22743.00, 'DITABUNG'),
(62, 62, '2026-06-07', 18207.00, 0.00, 0.00, 18207.00, 'DITABUNG'),
(63, 63, '2026-06-07', 88600.00, 41460.00, 0.00, 125914.00, 'DITABUNG'),
(64, 64, '2026-06-07', 92954.00, 62320.00, 150000.00, 5274.00, 'DIAMBIL'),
(65, 65, '2026-06-07', 64107.00, 0.00, 0.00, 64107.00, 'DITABUNG'),
(66, 66, '2026-06-07', 72540.00, 0.00, 0.00, 72540.00, 'DITABUNG'),
(68, 21, '2026-07-01', 42939.00, 0.00, 0.00, 42939.00, 'DITABUNG'),
(69, 16, '2026-07-01', 46501.00, 0.00, 0.00, 46501.00, 'DITABUNG'),
(70, 20, '2026-07-01', 58876.00, 0.00, 0.00, 58876.00, 'DITABUNG'),
(71, 11, '2026-07-01', 353416.00, 0.00, 0.00, 353416.00, 'DITABUNG'),
(72, 17, '2026-07-01', 3996.00, 0.00, 0.00, 3996.00, 'DITABUNG'),
(73, 3, '2026-07-01', 81448.00, 0.00, 0.00, 81448.00, 'DITABUNG'),
(74, 10, '2026-07-01', 1041553.00, 0.00, 0.00, 1041553.00, 'DITABUNG'),
(75, 55, '2026-07-01', 43614.00, 0.00, 0.00, 43614.00, 'DITABUNG'),
(76, 24, '2026-07-01', 171428.00, 0.00, 0.00, 171428.00, 'DITABUNG'),
(77, 12, '2026-07-01', 3852.00, 0.00, 0.00, 3852.00, 'DITABUNG'),
(78, 60, '2026-07-01', 161630.00, 0.00, 0.00, 161630.00, 'DITABUNG'),
(79, 44, '2026-07-01', 443509.00, 0.00, 0.00, 443509.00, 'DITABUNG'),
(80, 5, '2026-07-01', 119457.00, 0.00, 0.00, 119457.00, 'DITABUNG'),
(81, 33, '2026-07-01', 54.00, 0.00, 0.00, 54.00, 'DITABUNG'),
(82, 8, '2026-07-01', 7470.00, 0.00, 0.00, 7470.00, 'DITABUNG'),
(83, 52, '2026-07-01', 10413.00, 0.00, 0.00, 10413.00, 'DITABUNG'),
(84, 30, '2026-07-01', 181107.00, 0.00, 0.00, 181107.00, 'DITABUNG'),
(85, 57, '2026-07-01', 23436.00, 0.00, 0.00, 23436.00, 'DITABUNG'),
(86, 39, '2026-07-01', 271216.00, 0.00, 0.00, 271216.00, 'DITABUNG'),
(87, 58, '2026-07-01', 7344.00, 0.00, 0.00, 7344.00, 'DITABUNG'),
(88, 28, '2026-07-01', 1392683.00, 0.00, 0.00, 1392683.00, 'DITABUNG'),
(89, 42, '2026-07-01', 0.00, 0.00, 0.00, 0.00, 'DITABUNG'),
(90, 41, '2026-07-01', 182457.00, 0.00, 0.00, 182457.00, 'DITABUNG'),
(91, 9, '2026-07-01', 436794.00, 0.00, 0.00, 436794.00, 'DITABUNG'),
(92, 47, '2026-07-01', 352827.00, 0.00, 0.00, 352827.00, 'DITABUNG'),
(93, 2, '2026-07-01', 330097.00, 0.00, 0.00, 330097.00, 'DITABUNG'),
(94, 34, '2026-07-01', 26073.00, 0.00, 0.00, 26073.00, 'DITABUNG'),
(95, 63, '2026-07-01', 125914.00, 0.00, 0.00, 125914.00, 'DITABUNG'),
(96, 15, '2026-07-01', 192499.00, 0.00, 0.00, 192499.00, 'DITABUNG'),
(97, 38, '2026-07-01', 510007.00, 0.00, 0.00, 510007.00, 'DITABUNG'),
(98, 4, '2026-07-01', 168975.00, 0.00, 0.00, 168975.00, 'DITABUNG'),
(99, 54, '2026-07-01', 1350.00, 0.00, 0.00, 1350.00, 'DITABUNG'),
(100, 18, '2026-07-01', 12089.00, 0.00, 0.00, 12089.00, 'DITABUNG'),
(101, 48, '2026-07-01', 202680.00, 0.00, 0.00, 202680.00, 'DITABUNG'),
(103, 23, '2026-07-01', 8273.00, 0.00, 0.00, 8273.00, 'DITABUNG'),
(104, 40, '2026-07-01', 477597.00, 0.00, 0.00, 477597.00, 'DITABUNG'),
(105, 61, '2026-07-01', 22743.00, 0.00, 0.00, 22743.00, 'DITABUNG'),
(106, 26, '2026-07-01', 183229.00, 0.00, 0.00, 183229.00, 'DITABUNG'),
(107, 37, '2026-07-01', 15507.00, 0.00, 0.00, 15507.00, 'DITABUNG'),
(108, 22, '2026-07-01', 27842.00, 0.00, 0.00, 27842.00, 'DITABUNG'),
(109, 64, '2026-07-01', 5274.00, 0.00, 0.00, 5274.00, 'DITABUNG'),
(110, 65, '2026-07-01', 64107.00, 0.00, 0.00, 64107.00, 'DITABUNG'),
(111, 35, '2026-07-01', 17829.00, 0.00, 0.00, 17829.00, 'DITABUNG'),
(112, 59, '2026-07-01', 3600.00, 0.00, 0.00, 3600.00, 'DITABUNG'),
(113, 14, '2026-07-01', 586254.00, 0.00, 0.00, 586254.00, 'DITABUNG'),
(114, 1, '2026-07-01', 245528.00, 0.00, 0.00, 245528.00, 'DITABUNG'),
(115, 6, '2026-07-01', 658941.00, 0.00, 0.00, 658941.00, 'DITABUNG'),
(116, 7, '2026-07-01', 47871.00, 0.00, 0.00, 47871.00, 'DITABUNG'),
(117, 45, '2026-07-01', 66.00, 0.00, 0.00, 66.00, 'DITABUNG'),
(118, 50, '2026-07-01', 172126.00, 0.00, 0.00, 172126.00, 'DITABUNG'),
(119, 19, '2026-07-01', 283437.00, 0.00, 0.00, 283437.00, 'DITABUNG'),
(120, 27, '2026-07-01', 240008.00, 0.00, 0.00, 240008.00, 'DITABUNG'),
(121, 56, '2026-07-01', 10377.00, 0.00, 0.00, 10377.00, 'DITABUNG'),
(122, 36, '2026-07-01', 383220.00, 0.00, 0.00, 383220.00, 'DITABUNG'),
(123, 51, '2026-07-01', 4166.00, 0.00, 0.00, 4166.00, 'DITABUNG'),
(124, 66, '2026-07-01', 72540.00, 0.00, 0.00, 72540.00, 'DITABUNG'),
(125, 43, '2026-07-01', 50947.00, 0.00, 0.00, 50947.00, 'DITABUNG'),
(126, 49, '2026-07-01', 79914.00, 0.00, 0.00, 79914.00, 'DITABUNG'),
(127, 13, '2026-07-01', 1571056.00, 0.00, 0.00, 1571056.00, 'DITABUNG'),
(128, 25, '2026-07-01', 53033.00, 0.00, 0.00, 53033.00, 'DITABUNG'),
(129, 53, '2026-07-01', 3150.00, 0.00, 0.00, 3150.00, 'DITABUNG'),
(130, 32, '2026-07-01', 28828.00, 0.00, 0.00, 28828.00, 'DITABUNG'),
(131, 31, '2026-07-01', 501477.00, 0.00, 0.00, 501477.00, 'DITABUNG'),
(132, 29, '2026-07-01', 180167.00, 0.00, 0.00, 180167.00, 'DITABUNG'),
(133, 46, '2026-07-01', 419442.00, 0.00, 0.00, 419442.00, 'DITABUNG'),
(134, 62, '2026-07-01', 18207.00, 0.00, 0.00, 18207.00, 'DITABUNG');

-- --------------------------------------------------------

--
-- Table structure for table `setoran_pengepul`
--

CREATE TABLE `setoran_pengepul` (
  `id` int(11) NOT NULL,
  `id_harga_sampah` int(11) NOT NULL,
  `periode` date NOT NULL COMMENT 'Tanggal setoran ke pengepul',
  `jumlah_kg` decimal(10,2) NOT NULL COMMENT 'Total berat yang disetor ke pengepul',
  `harga_satuan` decimal(12,2) NOT NULL COMMENT 'Harga saat transaksi (bisa berbeda dari master)',
  `keterangan` varchar(100) DEFAULT NULL COMMENT 'Kosong = setoran pengepul, isi = DIBELI WARGA dll'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Rekap laporan setoran sampah ke pengepul per periode';

--
-- Dumping data for table `setoran_pengepul`
--

INSERT INTO `setoran_pengepul` (`id`, `id_harga_sampah`, `periode`, `jumlah_kg`, `harga_satuan`, `keterangan`) VALUES
(1, 1, '2026-06-07', 64.00, 3500.00, NULL),
(2, 2, '2026-06-07', 6.10, 2000.00, NULL),
(3, 3, '2026-06-07', 2.10, 15000.00, NULL),
(4, 4, '2026-06-07', 90.60, 1800.00, NULL),
(5, 5, '2026-06-07', 52.40, 1000.00, NULL),
(6, 6, '2026-06-07', 8.20, 2100.00, NULL),
(7, 7, '2026-06-07', 3.00, 3000.00, NULL),
(8, 8, '2026-06-07', 18.90, 1000.00, NULL),
(9, 9, '2026-06-07', 31.70, 2500.00, NULL),
(10, 10, '2026-06-07', 5.20, 300.00, NULL),
(11, 11, '2026-06-07', 9.60, 1800.00, NULL),
(12, 12, '2026-06-07', 5.20, 800.00, NULL),
(13, 13, '2026-06-07', 3.70, 400.00, NULL),
(14, 14, '2026-06-07', 1.00, 5000.00, 'DIBELI WARGA'),
(15, 1, '2026-06-07', 21.00, 3500.00, 'DIBELI WARGA'),
(16, 4, '2026-06-07', 3.70, 1800.00, 'DIBELI WARGA');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_setoran`
--
ALTER TABLE `detail_setoran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_nasabah` (`id_nasabah`),
  ADD KEY `id_harga_sampah` (`id_harga_sampah`);

--
-- Indexes for table `harga_sampah`
--
ALTER TABLE `harga_sampah`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nasabah`
--
ALTER TABLE `nasabah`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `setoran_nasabah`
--
ALTER TABLE `setoran_nasabah`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_nasabah_periode` (`id_nasabah`,`periode`) COMMENT 'Satu nasabah hanya boleh punya 1 rekap per periode';

--
-- Indexes for table `setoran_pengepul`
--
ALTER TABLE `setoran_pengepul`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_harga_sampah` (`id_harga_sampah`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_setoran`
--
ALTER TABLE `detail_setoran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `harga_sampah`
--
ALTER TABLE `harga_sampah`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `nasabah`
--
ALTER TABLE `nasabah`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `setoran_nasabah`
--
ALTER TABLE `setoran_nasabah`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `setoran_pengepul`
--
ALTER TABLE `setoran_pengepul`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_setoran`
--
ALTER TABLE `detail_setoran`
  ADD CONSTRAINT `detail_setoran_ibfk_1` FOREIGN KEY (`id_nasabah`) REFERENCES `nasabah` (`id`),
  ADD CONSTRAINT `detail_setoran_ibfk_2` FOREIGN KEY (`id_harga_sampah`) REFERENCES `harga_sampah` (`id`);

--
-- Constraints for table `setoran_nasabah`
--
ALTER TABLE `setoran_nasabah`
  ADD CONSTRAINT `setoran_nasabah_ibfk_1` FOREIGN KEY (`id_nasabah`) REFERENCES `nasabah` (`id`);

--
-- Constraints for table `setoran_pengepul`
--
ALTER TABLE `setoran_pengepul`
  ADD CONSTRAINT `setoran_pengepul_ibfk_1` FOREIGN KEY (`id_harga_sampah`) REFERENCES `harga_sampah` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
