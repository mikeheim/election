const Election = require('../models/Election')
const Candidate = require('../models/Candidate')
const District = require('../models/District')
const Vote = require('../models/Vote')
const Party = require('../models/Party')
const jwtUtil = require('../util/jwtutil')
const Sequelize = require('sequelize')
const Promise = require('bluebird')

module.exports = {
    //Create a new election
    create: function(req, res, next)
    {
        if(typeof req.body.name === undefined
            || typeof req.body.start === undefined
            || typeof req.body.end === undefined
            || typeof req.body.district === undefined
            || typeof req.body.candidates === undefined)
        {
            res.status(400).json({"message": "invalid request"})
            return
        }
        let election = req.body
        let candidates = [];
        //Add all the candidates
        election.candidates.forEach(item => {
            candidates.push(item.candidateId);
        })
        
        //Create the election
        Election.create({
            name: election.name,
            start: election.start,
            end: election.end,
            districtDistrictId: election.district
        }).then(election => {
            //Get all candidates and associate them with the election
            Candidate.findAll({
                where: {
                    candidateId: {
                        [Sequelize.Op.or]: candidates
                      } 
                }
            }).then(candidates => {
                candidates.forEach(item => {
                    //Does the update
                    item.setElection(election)
                })

                res.status(201).json({"message": "Election created"})
            }).catch(e => {
                next(e)
            })
        }).catch(e => {
            next(e)
        })
        
    },
    //Vote on an election
    vote: function(req, res, next)
    {
        if(typeof req.body.electionId === undefined
            || typeof req.body.candidateId === undefined)
        {
            res.status(400).json({"message": "invalid request"})
            return
        }
        let candidateId = req.body.candidateId
        let electionId = req.body.electionId
        //Get user's district from jwt
        let user = jwtUtil.verify(req.header('jwt'))
        let district = user.districtId
        //Check if the user is eligble for this election (by district)
        canVoteInElection(district, electionId, next).then(can => {
            //This election is not available to the user
            if(!can)
            {
                res.status(401).json({"message": "User is unauthorized to vote in this election"})
            }
            else
            {
                //Make sure the user hasn't already voted on this election
                Vote.findOne({
                    where: {
                        electionElectionId: electionId,
                        userUserId: user.userId
                    }
                }).then(vote => {
                    if(vote !== null)
                    {
                        res.status(401).json({"message": "Unauthorized, user has already voted"})
                    }
                    else
                    {
                        //If the user hasn't voted, we can submit the vote
                        Vote.create({
                            candidateCandidateId: candidateId,
                            electionElectionId: electionId,
                            userUserId: user.userId
                        }).then(() => {
                            res.status(201).json({"message": "vote cast"})
                        }).catch(e => {
                            next(e)
                        })
                    } 
                }).catch(e => {
                    next(e)
                })
            }
        })
        
    },
    //Get all elections for a user's ballot
    getBallot: function(req, res, next)
    {
        let user = jwtUtil.verify(req.header('jwt'))
        getElectionsForDistrict(user.districtId, next).then(elections => {
            res.status(200).json(elections)
        }).catch(e => {next(e)})
        
    },
    //Get the result of an election
    // TODO only say winner if the election is over (past the end date)
    result: function(req, res, next)
    {
        let results = {};
        results.candidates = [];
        let electionId = req.params.electionId
        //Get all candidates for the election
        Candidate.findAll({
            where: {
                electionElectionId: electionId
            },
            include: [Vote, Party]
        }).then(candidates => {
            //Aggregate results
            var winning = []
            var most = 0;
            candidates.forEach(candidate => {
                let obj = {}
                obj.name = candidate.name
                obj.party = candidate.party.name
                obj.votes = candidate.votes.length
                //Mark the current winner
                if(candidate.votes.length > most)
                {
                    most = candidate.votes.length
                    winning = []
                    winning.push(candidate.name)
                }
                //Keep track of ties
                else if(candidate.votes.length === most)
                {
                    winning.push(candidate.name)
                }
                results.candidates.push(obj)
            })
            results.tie = false;
            //Denotes a tie
            if(winning.length > 1)
            {
                results.tie = true
                results.winners = winning
            } else {
                results.winner = winning[0];
            }
            res.status(200).json(results)
        }).catch(e => {next(e)})
    }
}

//Determine if a user's district allows them to vote in this election
function canVoteInElection(districtId, electionId, next)
{
    return new Promise(function(resolve, reject){
        getElectionsForDistrict(districtId, next)
        .then(elections => {
            elections.forEach(election => {
                if(election.electionId === electionId)
                {
                    resolve(true)
                    return
                }
            })
            resolve(false)
        })
    })

}

//Get all of the elections available to a district
function getElectionsForDistrict(districtId, next)
{
    return new Promise(function(resolve, reject){
        let districtIds = [];
        District.findOne({
            where: {
                districtId: districtId
            }
        }).then(district => {
            districtIds.push(district.districtId);
            //If district has parent, add it
            district.getParent().then(parent => getParentDistricts(parent, districtIds, next))
            .finally(() => {
                Election.findAll({
                    where: {
                        districtDistrictId: {
                            [Sequelize.Op.or]: districtIds
                        }
                    }
                }).then(elections => {
                    resolve(elections)
                })
                .catch(e => {
                    reject(e)
                })
            }) 
        })
    })
}

//Recursively get all parent districts
function getParentDistricts(district, districtIds, next)
{
    if(district === null)
    {
        return districtIds;
    }
    districtIds.push(district.districtId)
    district.getParent().then(parent => getParentDistricts(parent, districtIds, next)).catch(e => {next(e)})
}
