'use strict';
const bodyParser = require('body-parser')
module.exports = function (app) {
    
    let jsonParser = bodyParser.json()
    var authenticate = require('../controllers/Authenticate');

    app.post('/authenticate', jsonParser, function(req, res, next){
        authenticate.authenticate(req, res, next)
    })
}