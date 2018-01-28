-- Create database

CREATE DATABASE `calendar_app`

--
-- Table structure for table `todolist`
--

CREATE TABLE `todolist` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `checked` tinyint(1) NOT NULL,
  `starred` tinyint(1) NOT NULL,
  `date` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


