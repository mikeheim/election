const db = require('../db');

const Candidate = {

    create: function(req, res)
    {
        let rawCandidate = req.body;
        let candidate = {"name": rawCandidate.name, "party": rawCandidate.party, "incumbent": rawCandidate.incumbent};

        let sql = 'INSERT INTO candidate (candidatename, idparty, incumbent) VALUES (?,?,?)'
        let results = db.query(sql, [candidate.name, candidate.party, candidate.incumbent]
            , function(error, results, fields){
                if(error)
                {
                    res.status('500').send('Internal Error')
                } else {
                    res.status('201').send()
                }
            })
    },

    getAll: function(req, res)
    {
        let sql = 'SELECT * FROM candidate c JOIN party p on p.idparty = c.idparty'
        let results = db.query(sql,
            function(error, results){
                if(error){
                    res.status('500').send('Internal error')
                    console.log(error);
                }
                else
                {
                    res.status('200').json(results)
                }
            })
    }
}

module.exports = Candidate