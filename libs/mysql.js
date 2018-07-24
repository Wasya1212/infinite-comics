const Sequelize = require('sequelize');
const sequelize = new Sequelize('user271351_infinite_comics', 'user271351', 'tfp7cRRoug4D', {
  host: '46.21.250.90',
  dialect: 'mysql',
  operatorsAliases: Sequelize.Op,
  pool: {
    max: 10,
    min: 0,
    idle: 100000
  }
});

module.exports = sequelize;
