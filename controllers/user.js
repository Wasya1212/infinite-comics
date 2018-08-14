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
    return User.findOne({ where: { uuid: id } });
  }

  findByUsername(username) {
    return User.findOne({ where: { username: username } });
  }

  findAllByUsernames(username) {
    return User.findAll({ where: { username: username } });
  }

  findByEmail(email) {
    return User.findOne({ where: { email: email } });
  }

  findOne(conditions) {
    return User.findOne({ where: conditions });
  }

  selectPublicInfo(user) {
    let cleanUser = Object.assign(user);
    delete cleanUser.id;
    return cleanUser;
  }

  updateById(id, conditions) {
    return User.update(conditions, { where: { uuid: id } });
  }

  deleteById(id) {
    return User.destroy({ where: { uuid: id } });
  }
}

module.exports = new UserController();
