const mysql = require('../libs/mysql');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-promise');
const uuid = require('uuid/v4');
const config = require('../config/default');
// mysql.sync({force: true})
let User = mysql.define('users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: { msg: "username is required" } }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: { msg: "email is required" },
      isEmail: { msg: 'email is invalid' }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: { msg: "password is required" } }
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  uuid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: uuid()
  },
  confirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

User.validPassword = (plainTextPassword, hash, user, done) => {
  return bcrypt.compare(plainTextPassword, hash);
}

User.beforeCreate((user, options) => {
  if (user.username == config.validation.admin.username && user.password == config.validation.admin.password) {
    user.admin = true;
  }
  return bcrypt.hash(user.password, 12).then(hash => {
    user.password = hash;
  });
});

module.exports = User;
