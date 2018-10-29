const Sequelize = require('sequelize')
const db = require('../db')
const Candidate = require('./Candidate')
const District = require('./District')
const Vote = require('./Vote')
const Election = db.define('election', {
    electionId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    start: {
        type: Sequelize.DATE
    },
    end: {
        type: Sequelize.DATE
    }
  })
  Election.hasMany(Vote)
// WHY doesn't this work?
//  Election.hasMany(Candidate)
  Election.belongsTo(District)
  db.sync()

  module.exports = Election