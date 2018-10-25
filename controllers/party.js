const db = require('../db');

const Party = {

    getParties: function(req, res)
    {
        let results = db.query('SELECT * from party'
            , function(error, results, fields){
                if(error)
                {
                    res.status('500').send('Internal Error')
                } else {
                    res.status('200').json(results)
                }
            })
    }
}

module.exports = Party