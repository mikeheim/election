const District = require('../models/District')

module.exports = {
    
    //Insert a new district
    create: function(req, res, next)
    {
        if(typeof req.body.name === undefined)
        {
            res.status(400).json({"message": "invalid request"})
            return
        }
        District.create({
            name: req.body.name,
            parentDistrictId: req.body.parentDistrictId
        }).then(() =>{
            res.status(201).json({"message": "district created"});
        }).catch(e => {
            next(e)
        })
    },
    //Get all districts
    getAll: function(req, res, next)
    {
        District.findAll().then(districts => {
            res.status(200).json(districts)
        }).catch(e => {
            next(e)
        })
    }
}
