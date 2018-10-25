const fs   = require('fs');
const jwt   = require('jsonwebtoken');

var privateKEY  = fs.readFileSync('config/keys/private.key', 'utf8');
var publicKEY  = fs.readFileSync('config/keys/public.key', 'utf8');  
module.exports = {
    sign: (payload) => {
        var signOptions = {
            expiresIn:  "1h",  
            algorithm:  "RS256"    
        };
        return jwt.sign(payload, privateKEY, signOptions);
    },
    verify: (token) => {
        var verifyOptions = {
            expiresIn:  "1h",
            algorithm:  ["RS256"]
        };
        try{
            return jwt.verify(token, publicKEY, verifyOptions);
        }catch (err){
            return false;
        }
    },
    decode: (token) => {
        return jwt.decode(token, {complete: true});
    }
}