-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lis 05, 2024 at 10:59 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `drzewo`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ancestors`
--

CREATE TABLE `ancestors` (
  `person_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `middle_name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `dateOfDeath` date NOT NULL,
  `gender` varchar(20) NOT NULL,
  `placeOfBirth` varchar(255) NOT NULL,
  `placeOfDeath` varchar(255) NOT NULL,
  `occupation` varchar(60) NOT NULL,
  `notes` text NOT NULL,
  `parent_id` int(11) NOT NULL,
  `parent_id2` int(11) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `dateLastUpdated` date NOT NULL,
  `children_ids` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `login`, `password`) VALUES
(1, 'Kamil', 'Kamil'),
(4, 'kox', '123'),
(5, 'aaa', 'Ko1234567890'),
(6, 'abcd', 'Kolo1234567'),
(7, 'asd', 'asdF1234567'),
(8, 'asd111', 'Kolo1234567'),
(9, '', 'Kolo1234567'),
(10, 'koleś123', 'Kolo1234567');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `ancestors`
--
ALTER TABLE `ancestors`
  ADD PRIMARY KEY (`person_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ancestors`
--
ALTER TABLE `ancestors`
  MODIFY `person_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
