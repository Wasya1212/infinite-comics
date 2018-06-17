const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-promise');

module.exports = sequelize => {
  let User = sequelize.define('users', {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: { notEmpty: { msg: "username is required" } }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "password is required" } }
    }
  });

  User.validPassword = (plainTextPassword, hash, user, done) => {
    return bcrypt.compare(plainTextPassword, hash);
  }

  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 12).then(hash => {
      user.password = hash;
    });
  });

  return User;
}
