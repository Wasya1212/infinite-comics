CREATE TABLE users (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100),
  nickname VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  admin BOOLEAN NOT NULL DEFAULT 0,
  originalImageUrl VARCHAR(100) NOT NULL,
  compressedImageUrl VARCHAR(100) NOT NULL,
  originalImageId INT UNSIGNED DEFAULT 1,
  compressedImageId INT UNSIGNED DEFAULT 1
);
