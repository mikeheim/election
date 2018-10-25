const db = require('../db');
const jwtUtil = require('../util/jwtutil')

const Authenticate = {
    
    // For actually authenticating the user
    authenticate: function(req, res, next)
    {
        var sql = 'SELECT iduser, username, email FROM user WHERE username = ? AND password = ?'
        var inserts = [req.body.username, req.body.password]

        //Execute query
        db.query(sql
        , inserts
        , function(error, results, fields){
            var resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            //Pass error up to express
            if(error){
                next(error)
            }
            //Invalid user
            else if(resultJson.length === 0)
            {
                res.status(404).send("Invalid User supplied")
            }
            else
            {
                //Add data to JWT, excluding password
                let payload = {};
                payload.iduser = resultJson[0].iduser
                payload.username = resultJson[0].username
                payload.email = resultJson[0].email
                //Sign a new JWT
                var token = jwtUtil.sign(payload)
                res.status(200).header('jwt', token).send("Valid User supplied")
            }
        })
    }
}

module.exports = Authenticate