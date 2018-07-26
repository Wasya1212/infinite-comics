const mysql = require('../libs/mysql');
const Sequelize = require('sequelize');

let Character = mysql.define('characters', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: { notEmpty: { msg: "name is required" } }
  },
  real_name: {
    type: Sequelize.STRING,
    defaultValue: 'uknown'
  },
  image: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: false,
      min: {
        args: [0],
        msg: "Image id must be unsigned value"
      }
    }
  },
  universe: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: { msg: "universe is required" } }
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  birth_date: {
    type: Sequelize.STRING,
    defaultValue: 'uknown'
  },
  first_appearence: {
    type: Sequelize.DATE
  },
  powers: [{
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: false,
      len: {
        args: [3, 50],
        msg: "Please provide field within 3 to 50 characters"
      }
    }
  }],
  franchises: [{ // comics
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      notEmpty: false,
      min: {
        args: [0],
        msg: "Franchise id must be unsigned value"
      }
    }
  }],
  birth_place: {
    type: Sequelize.STRING,
    default: 'uknown'
  },
  groups: [{
    name: Sequelize.STRING,
    creation_date: {
      type: Sequelize.STRING,
      default: 'uknown'
    },
    members: [{
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: false,
        min: {
          args: [0],
          msg: "Member id must be unsigned value"
        }
      }
    }],
    description: {
      type: Sequelize.TEXT
    }
  }],
  interesting_facts: [{
    type: Sequelize.STRING
  }],
  creators: [{
    name: Sequelize.STRING,
    image: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: false,
        min: {
          args: [0],
          msg: "Image id must be unsigned value"
        }
      }
    },
    birth_place: Sequelize.STRING,
    info: Sequelize.TEXT
  }],
  sex: {
    type: Sequelize.STRING,
    validate: {
      isIn: {
        args: [['male', 'female', 'uknown']],
        msg: "Sex must be male/female or uknown"
      }
    }
  },
  creation_date: {
    type: Sequelize.DATE,
    allowNull: true
  }
});

module.exports = Character;
