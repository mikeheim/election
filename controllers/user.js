const User = require('../models/User')
const Encrypt = require('../util/encrypt')

module.exports = {
    
    // For actually authenticating the user
    create: function(req, res, next)
    {
        if(typeof req.body.name === undefined
            || typeof req.body.email === undefined
            || typeof req.body.password === undefined
            || typeof req.body.districtId === undefined)
        {
            res.status(400).json({"message": "invalid request"})
            return
        }
        let user = req.body
        //Encrypt the password
        let encrypted = Encrypt.encrypt(user.password)
        User.create({
            username: user.username,
            password: encrypted,
            email: user.email,
            districtDistrictId: user.districtId

        }).then(() =>{
            res.status(201).json({"message": "user created"});
        })
    }
}
