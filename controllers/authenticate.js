const jwtUtil = require('../util/jwtutil')
const User = require('../models/User')
const Encrypt = require('../util/encrypt')

const Authenticate = {
    
    // For actually authenticating the user
    authenticate: function(req, res, next)
    {
        let username = req.body.username
        let password = req.body.password
        User.findOne({
            where: {
                username : username
            }
        }).then(user => {
            if(user === null)
            {
                res.status(404).json({"message": "invalid user supplied"})
            }
            else {
                //Make sure password is a match
                if(!Encrypt.compare(password, user.password))
                {
                    res.status(400).json({"message": "invalid password"})
                }
                else
                {
                    //Add data to JWT, excluding password
                    let payload = {};
                    payload.userId = user.userId
                    payload.username = user.username
                    payload.email = user.email
                    payload.districtId = user.districtDistrictId
                    //Sign a new JWT
                    var token = jwtUtil.sign(payload)
                    res.status(200).header('jwt', token).json({"message": "Valid User supplied"})
                }
        }
        }).catch(e => {
            next(e)
        })
    }
}

module.exports = Authenticate