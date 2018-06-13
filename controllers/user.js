'use strict';

const mysql = require('../middleware/mysql');
const Image = require('./image');

module.exports = poolConnection => {
  return class User {
    constructor(user, image) {
      const {originalImage, compressedImage} = image || {originalImage: Image.defaultOriginalImage, compressedImage: Image.defaultCompressedImage};

      this.username = user.username;
      this.nickname = user.nickname;
      this.email = user.email;
      this.password = user.password;
      this.originalImage = {
        path: originalImage.path,
        id: originalImage.id
      };
      this.compressedImage = {
        path: compressedImage.path,
        id: compressedImage.id
      };
    }

    save() {
      return poolConnection.insert(User.tableName, {
        username: this.username,
        nickname: this.nickname,
        email: this.email,
        password: this.password,
        originalImagePath: this.originalImage.path,
        originalImageId: this.originalImage.id,
        compressedImagePath: this.compressedImage.path,
        compressedImageId: this.compressedImage.id
      });
      // return poolConnection.createTable(User.tableName);
    }

    static get tableName() {
      return 'users';
    }

    static createUser(userParams, image) {
      return new User(userParams, image);
    }
  };
};
