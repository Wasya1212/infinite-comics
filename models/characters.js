const mysql = require('../libs/mysql');
const Sequelize = require('sequelize');

let Character = mysql.define('characters', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: { notEmpty: { msg: "username is required" } }
  },
  
});
