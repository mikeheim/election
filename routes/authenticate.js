'use strict';
const bodyParser = require('body-parser')
//export by default
module.exports = function (app) {
    
    let jsonParser = bodyParser.json()
    var authenticate = require('../controllers/Authenticate');

    app.post('/authenticate', jsonParser, function(req, res){
        authenticate.authenticate(req, res)
    })
}