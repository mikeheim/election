//Connect to mysql via sequelize ORM
const Sequelize = require('sequelize');
require('sequelize-hierarchy')(Sequelize)
const sequelize = new Sequelize('election', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize


