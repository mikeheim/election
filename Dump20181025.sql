-- MySQL dump 10.13  Distrib 8.0.13, for macos10.14 (x86_64)
--
-- Host: localhost    Database: elections
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `candidate`
--

DROP TABLE IF EXISTS `candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `candidate` (
  `idcandidate` int(11) NOT NULL AUTO_INCREMENT,
  `candidatename` varchar(100) NOT NULL,
  `idparty` int(11) DEFAULT NULL,
  `incumbent` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`idcandidate`),
  KEY `idparty_idx` (`idparty`),
  CONSTRAINT `idparty` FOREIGN KEY (`idparty`) REFERENCES `party` (`idparty`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate`
--

LOCK TABLES `candidate` WRITE;
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` VALUES (1,'Hillary Clinton',1,0),(2,'Donald Trump',2,0),(3,'George W. Bush',2,0),(4,'Ted Cruz',2,1),(5,'Beto O\'Rourke',1,0),(6,'Mike Heim',3,0),(7,'Pat Castillo',1,0),(8,'test1',2,0),(9,'test2',1,0);
/*!40000 ALTER TABLE `candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `election`
--

DROP TABLE IF EXISTS `election`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `election` (
  `idelection` int(11) NOT NULL AUTO_INCREMENT,
  `electionname` varchar(200) NOT NULL,
  `startdate` datetime NOT NULL,
  `enddate` datetime NOT NULL,
  PRIMARY KEY (`idelection`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `election`
--

LOCK TABLES `election` WRITE;
/*!40000 ALTER TABLE `election` DISABLE KEYS */;
INSERT INTO `election` VALUES (4,'Presidental Election','2018-10-25 10:54:06','2018-11-25 10:54:06'),(5,'Texas Senate','2018-10-25 10:54:06','2018-11-25 10:54:06'),(6,'Best Roommate','2018-10-25 10:54:06','2018-11-25 10:54:06'),(7,'Test Election','2018-10-25 10:54:06','2018-11-25 10:54:06'),(8,'Test Election','2018-10-25 10:54:06','2018-11-25 10:54:06');
/*!40000 ALTER TABLE `election` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electioncandidates`
--

DROP TABLE IF EXISTS `electioncandidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `electioncandidates` (
  `idelectioncandidates` int(11) NOT NULL AUTO_INCREMENT,
  `idelections` int(11) NOT NULL,
  `idcandidate` int(11) NOT NULL,
  PRIMARY KEY (`idelectioncandidates`),
  KEY `idelections_idx` (`idelections`),
  KEY `idcandidate_idx` (`idcandidate`),
  CONSTRAINT `idcandidate` FOREIGN KEY (`idcandidate`) REFERENCES `candidate` (`idcandidate`),
  CONSTRAINT `idelections` FOREIGN KEY (`idelections`) REFERENCES `election` (`idelection`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electioncandidates`
--

LOCK TABLES `electioncandidates` WRITE;
/*!40000 ALTER TABLE `electioncandidates` DISABLE KEYS */;
INSERT INTO `electioncandidates` VALUES (1,4,1),(2,4,2),(3,5,4),(4,5,5),(5,6,6),(6,6,7),(7,7,8),(8,7,9),(9,8,8),(10,8,9);
/*!40000 ALTER TABLE `electioncandidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party`
--

DROP TABLE IF EXISTS `party`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `party` (
  `idparty` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`idparty`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party`
--

LOCK TABLES `party` WRITE;
/*!40000 ALTER TABLE `party` DISABLE KEYS */;
INSERT INTO `party` VALUES (1,'Democrat'),(2,'Republican'),(3,'Independent');
/*!40000 ALTER TABLE `party` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `username` varchar(45) NOT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'password','mike.heim0318@gmail.com','mike'),(2,'password','email@email.com','abc'),(3,'password','email','def'),(4,'password','sdfsdf','ghi');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `votes` (
  `idvotes` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) NOT NULL,
  `idelection` int(11) NOT NULL,
  `idcandidate` int(11) NOT NULL,
  PRIMARY KEY (`idvotes`),
  KEY `fk_idelection_idx` (`idelection`),
  KEY `fk_iduser_idx` (`iduser`),
  KEY `fk_idcandidate_idx` (`idcandidate`),
  CONSTRAINT `fk_idcandidate` FOREIGN KEY (`idcandidate`) REFERENCES `electioncandidates` (`idcandidate`),
  CONSTRAINT `fk_idelection` FOREIGN KEY (`idelection`) REFERENCES `election` (`idelection`),
  CONSTRAINT `fk_iduser` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
INSERT INTO `votes` VALUES (2,1,4,1),(3,2,4,2),(4,3,4,2),(5,4,4,1),(6,4,5,5),(7,1,5,5),(8,2,5,4),(9,2,6,6),(10,1,6,7);
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-25 13:24:38
