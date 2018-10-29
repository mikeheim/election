const Sequelize = require('sequelize')
const db = require('../db')
const Vote = db.define('vote', {
    voteId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  })

  db.sync()
  module.exports = Vote