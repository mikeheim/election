const db = require('../db');
const Candidate = require('../models/Candidate')
const Election = require('../models/Election')
const Party = require('../models/Party')
const Vote = require('../models/Vote')
module.exports = {

    //Create a new candidate
    create: function(req, res, next)
    {
        if(typeof req.body.name === undefined
            || typeof req.body.party === undefined)
            {
                res.status(400).json({"message": "invalid request"})
                return
            }
        Candidate.create({
            name: req.body.name,
            partyPartyId: req.body.party
        }).then(()=>{
            res.status('201').json({"message":"created"})
        }).catch(e => {
             next(e)
        })
    },

    //Get all of the candidates
    getAll: function(req, res, next)
    {
        Candidate.findAll({include: [Party, Election]}).then(candidates => {
            let results = []
            candidates.forEach(candidate => {
                let result = {}
                result.name = candidate.name
                result.party = candidate.party.name
                result.election = candidate.election
                result.candidateId = candidate.candidateId
                //result.party = candidate.partyPartyId
                results.push(result)
            })
            res.status(200).json(results)
        }).catch(e => {
            next(e)
        })
    },
    getForElection: function(req, res, next)
    {
        if(typeof req.params.electionId === undefined)
        {
            res.status(400).json({"message": "invalid request"})
            return
        }
        let electionId = req.params.electionId
        Candidate.findAll({
            where: {
                electionElectionId: electionId
            },
            include: [Party, Vote]
        }).then(candidates => {
            let output = [];
            candidates.forEach(candidate => {
                let item = {};
                item.name = candidate.name
                item.party = candidate.party.name
                item.candidateId = candidate.candidateId
                item.votes = candidate.votes.length
                output.push(item)
            })
            res.status(200).json(output)
        }).catch(e => {
            next(e)
        })
    }
}