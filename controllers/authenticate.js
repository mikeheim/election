const db = require('../db');
const jwtUtil = require('../util/jwtutil')

const Authenticate = {
    
    authenticate: function(req, res)
    {
        let user = req.body;
        var sql = 'SELECT iduser, username, email FROM user WHERE username = ? AND password = ?'
        var inserts = [user.username, user.password]
      
        console.log(db.format(sql, inserts))
        
        let results = db.query(sql
        , inserts
        , function(error, results, fields){
            var resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);

            if(resultJson.length === 0)
            {
                res.status(404).send("Invalid User supplied")
            }
            else
            {
                let payload = {};
                payload.iduser = resultJson[0].iduser
                payload.username = resultJson[0].username
                payload.email = resultJson[0].email
                console.log(payload)
                var token = jwtUtil.sign(payload)
                console.log(token);
                res.status(200).header('jwt', token).send("Valid User supplied")
            }
        })
    }
}

module.exports = Authenticate