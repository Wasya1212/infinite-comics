'use strict';

const mysql = require('../middleware/mysql');
const Image = require('./image')();

module.exports = poolConnection => {
  return class User {
    constructor(user) {
      this.username = user.username;
      this.nickname = user.nickname;
      this.email = user.email;
      this.password = user.password;
      this.originalImage = {
        url: Image.defaultOriginalImage.url,
        id: Image.defaultOriginalImage.id
      };
      this.compressedImage = {
        url: Image.defaultCompressedImage.url,
        id: Image.defaultCompressedImage.id
      };
    }

    save() {
      return poolConnection.insert(User.tableName, {
        username: this.username,
        nickname: this.nickname,
        email: this.email,
        password: this.password,
        originalImageUrl: this.originalImage.url,
        originalImageId: this.originalImage.id,
        compressedImageUrl: this.compressedImage.url,
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
