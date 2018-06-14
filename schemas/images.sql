CREATE TABLE images (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  url VARCHAR(100) NOT NULL,
  size INT UNSIGNED NOT NULL,
  originalName VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL UNIQUE,
  fullName VARCHAR(100) NOT NULL UNIQUE,
  meta TEXT CHARACTER SET binary
);
