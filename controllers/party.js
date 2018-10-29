const db = require('../db');
const Party = require('../models/Party')
module.exports = {

    //Get all parties
    getParties: function(req, res, next)
    {
        Party.findAll().then(parties => {
            let output = []
            parties.forEach(function(party){
                let response = {}
                response.name = party.name
                response.partyId = party.partyId
                output.push(response);
            })
            res.status(200).json(output)
        }).catch(e => {
            next(e)
        })
    },
    create: function(req, res, next)
    {
        if(typeof req.body.name === undefined)
        {
            res.status(400).json({"message": "invalid request"})
            return
        }
        let party = req.body
        Party.create({
            name: party.name
        }).then(() => {
            res.status(201).json({"message": "Party created"})
        }).catch(e => {
            next(e)
        })
    }
}
