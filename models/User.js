const Sequelize = require('sequelize')
const db = require('../db')
const Vote = require('./Vote')
const User = db.define('user', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }, 
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
  })

  User.hasMany(Vote)
  db.sync()

  module.exports = User