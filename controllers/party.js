const db = require('../db');

const Party = {

    //Get all parties
    getParties: function(req, res, next)
    {
        let results = db.query('SELECT * from party'
            , function(error, results, fields){
                if(error)
                {
                    next(error)
                } else {
                    res.status('200').json(results)
                }
            })
    }
}

module.exports = Party