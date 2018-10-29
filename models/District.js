const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./User')

const District = db.define('district', {
    districtId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      unique: true
    }
  });

  District.isHierarchy()
  District.hasMany(User)
  db.sync()

  module.exports = District