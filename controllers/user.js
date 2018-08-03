'use strict';

const User = require('../models/user');

class UserController {
  constructor() {
    this.tableName = User.getTableName;
    this.validPassword = User.validPassword;
  }

  save(conditions) {
    return User.create(conditions);
  }

  find(conditions) {
    return User.find(conditions);
  }

  findAll() {
    return User.findAll({});
  }

  findById(id) {
    return User.findById(id);
  }

  findByUsername(username) {
    return User.findOne({ where: { username: username } });
  }

  findAllByUsernames(username) {
    return User.findAll({ where: { username: username } });
  }

  findOne(conditions) {
    return User.findOne({ where: conditions });
  }
}

module.exports = new UserController();
