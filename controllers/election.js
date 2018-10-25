const db = require('../db');
const jwtUtil = require('../util/jwtutil')

const Election = {

    create: function(req, res)
    {
        let election = req.body
        //first insert the new election, then insert the candidates to the relationship table
        let electionSql = 'INSERT INTO election (electionname, startdate, enddate)' +
            ' VALUES (?, ?, ?)'
        let inserts = [election.name, election.start, election.end]
        let results = db.query(electionSql, inserts, function(error, results){
            if(error)
            {
                console.log(error)
                res.status('500').send("Internal error")
            } else {
                db.query('SELECT LAST_INSERT_ID() as pk', function(error, results){
                    var resultJson = JSON.stringify(results);
                    resultJson = JSON.parse(resultJson);
                    var electionId = resultJson[0].pk;
                    //Insert the candidates to the election
                    let inserts = [];
                    let candidateSql = 'INSERT INTO electioncandidates (idelections, idcandidate) VALUES '
                    for(var i = 0; i < election.candidates.length; i++)
                    {
                        if(i === 0){
                            candidateSql += "(?, ?)"
                        } else {
                            candidateSql += ", (?, ?)"
                        }
                        inserts.push(electionId);
                        inserts.push(election.candidates[i].idcandidate);

                    }

                    db.query(candidateSql, inserts, function(error, results){
                        if(error)
                        {
                            res.status('500').send("Internal Error")
                            console.log(error);
                        }else{
                            res.status('201').send("Election created")
                        }
                    })
                })
            }
        })
    },
    vote: function(req, res)
    {
        let idelection = req.body.idelection
        let idcandidate = req.body.idcandidate
        //First check to see if the current user has voted 
        let user = jwtUtil.verify(req.header('jwt'))
        console.log(user);
    
        let sql = 'SELECT * from votes where idelection = ? and iduser = ?'
        let inserts = [idelection, user.iduser]

        db.query(sql, inserts, function(error, results){
            if(error){
                console.log(error)
                res.status('500').send("Internal Error")
            } else if(results.length > 0)
            {
                res.status('403').send("User has already voted")

            } else {
                //Now the real vote is cast!
                let sql = 'INSERT INTO votes (idelection, iduser, idcandidate) VALUES (?,?,?)'
                let inserts = [idelection, user.iduser, idcandidate]
                db.query(sql, inserts, function(error, results){
                    if(error){
                        console.log(error)
                        res.status('500').send("Internal Error")
                        return
                    }
                    res.status(200).send("Vote cast!")
                })
            }


            
        })
    },
    getActiveElections: function(req, res){

        //Query to get elections and current standings
        let sql = 'SELECT count(*) as votes, c.candidatename, e.electionname FROM votes v join election e on v.idelection = e.idelection join candidate c on v.idcandidate = c.idcandidate group by c.candidatename, e.electionname ORDER BY e.electionname'
        db.query(sql, function(error, results){
            var resultJson = JSON.stringify(results);
            results = JSON.parse(resultJson);
            
            res.status(200).json(results)
        })
    }
}

module.exports = Election