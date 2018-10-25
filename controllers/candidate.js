const db = require('../db');

const Candidate = {

    //Create a new candidate
    create: function(req, res, next)
    {
        let sql = 'INSERT INTO candidate (candidatename, idparty, incumbent) VALUES (?,?,?)'
        let results = db.query(sql, [req.body.name, req.body.party, req.body.incumbent]
            , function(error, results, fields){
                if(error)
                {
                    next(error)
                } else {
                    res.status('201').send()
                }
            })
    },

    //Get all of the candidates
    getAll: function(req, res, next)
    {
        let sql = 'SELECT * FROM candidate c JOIN party p on p.idparty = c.idparty'
        let results = db.query(sql,
            function(error, results){
                if(error){
                    next(error)
                }
                else
                {
                    res.status('200').json(results)
                }
            })
    }
}

module.exports = Candidate