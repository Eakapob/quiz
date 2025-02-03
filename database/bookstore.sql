-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 03, 2025 at 05:55 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookstores`
--

CREATE TABLE `bookstores` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(255) NOT NULL,
  `image_data` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookstores`
--

INSERT INTO `bookstores` (`id`, `name`, `price`, `image_data`) VALUES
(1, 'แฮร์รี่ พอตเตอร์กับศิลาอาถรรพ์ ', 290, 'ศิลาอาถรรพ์.jpg'),
(2, 'แฮร์รี่ พอตเตอร์กับห้องแห่งความลับ', 325, 'ห้องแห่งความลับ.jpg'),
(3, 'แฮร์รี่ พอตเตอร์กับถ้วยอัคนี', 300, 'ถ้วยอัคนี.jpg'),
(7, 'แฮร์รี่ พอตเตอร์กับภาคีนกฟีนิกซ์', 280, 'ภาคีนกฟีนิกซ์.jpg'),
(8, 'แฮร์รี่ พอตเตอร์กับเจ้าชายเลือดผสม', 350, 'เจ้าชายเลือดผสม.jpg'),
(9, 'แฮร์รี่ พอตเตอร์กับเครื่องรางยมทูต', 420, 'เครื่องรางยมทูต.jpg'),
(10, 'แฮร์รี่ พอตเตอร์ กับเด็กต้องคำสาป บทละครเวที', 425, 'เด็กต้องคำสาป บทละครเวที.jpg'),
(11, 'หนังสือเพอร์ซีย์แจ็กสันกับสายฟ้าที่หายไป ', 255, 'เพอร์ซีย์แจ็กสันกับสายฟ้าที่หายไป.webp'),
(12, 'HisDarkMaterials', 250, 'HisDarkMaterials.jpg'),
(13, 'หนังสือเอรากอน', 350, 'เอรากอน.png'),
(14, 'หนังสือเอลเดสต์', 525, 'เอลเดสต์.jpg'),
(15, 'หนังสือบริซิงเกอร์', 470, 'บริซิงเกอร์.jpg'),
(16, 'อินเฮริแทนซ์', 505, 'อินเฮริแทนซ์.jpg'),
(17, 'หนังสือกำเนิดนาร์เนีย', 230, 'กำเนิดนาร์เนีย.jpg'),
(18, 'Priory of the Orange Tree', 535, 'The Priory of the Orange Tree.jpg'),
(19, 'I Am Wednesday', 200, 'I Am Wednesday.jpg'),
(20, 'มหันตภัยแห่งแหวน : เดอะลอร์ดออฟเดอะริงส์', 570, 'The Lord of The Rings.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookstores`
--
ALTER TABLE `bookstores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookstores`
--
ALTER TABLE `bookstores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
