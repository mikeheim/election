const Sequelize = require('sequelize')
const db = require('../db')
const Party = db.define('party', {
    partyId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    }
  })
  db.sync()
  module.exports = Party