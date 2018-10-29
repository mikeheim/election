const Sequelize = require('sequelize')
const db = require('../db')
const Election = require('./Election')
const Vote = require('./Vote')
const Party = require('./Party')

const Candidate = db.define('candidate', {
    candidateId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    }
  })
  Candidate.belongsTo(Party)
  Candidate.hasMany(Vote)
  Candidate.belongsTo(Election)
  db.sync()

  module.exports = Candidate