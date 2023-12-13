SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `opmBand` (
  `id` int(11) NOT NULL,
  `opmband_name` varchar(100) NOT NULL,
  `origin` varchar(100) NOT NULL,
  `leadvocalist_name` varchar(100) NOT NULL,
  `formation_date` date NOT NULL,
  `first_album` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `opmBand` (`id`, `opmband_name`, `origin`, `leadvocalist_name`, `formation_date`,
 `first_album`) VALUES
 
ALTER TABLE `opmBand`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `opmBand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;
