const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
    encrypt: (password) => {
       return bcrypt.hashSync(password, saltRounds)
        
    },
    compare: (password, hash) => {
        return bcrypt.compareSync(password, hash)
    }
}