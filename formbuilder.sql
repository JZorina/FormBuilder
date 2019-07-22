


DROP TABLE IF EXISTS `formdata`;
CREATE TABLE IF NOT EXISTS `formdata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `formid` int(11) NOT NULL,
  `data` varchar(1500) NOT NULL,
  PRIMARY KEY (`id`)
) ;



DROP TABLE IF EXISTS `forms`;
CREATE TABLE IF NOT EXISTS `forms` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `formSchema` varchar(1500) NOT NULL,
  PRIMARY KEY (`id`)
) ;

