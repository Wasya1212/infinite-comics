'use strict';

const Image = require('./image');

module.export = class User {
  constructor(user, {originalImage = Image.getDefaultOriginalImage, compressedImage = Image.getDefaultCompressedImage}) {
    this.username = user.username;
    this.nickname = user.nickname;
    this.email = user.email;
    this.password = user.password;
    this.admin = user.admin;
    this.originalImage = {
      path: image.originalImage.path,
      id: image.originalImage.id
    };
    this.compressedImage = {
      path: image.compressedImage.path,
      id: image.compressedImage.id
    };
  }

  save() {

  }

  static createUser(userParams, image) {
    return new User(userParams, image);
  }
};