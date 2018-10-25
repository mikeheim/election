'use strict';
const bodyParser = require('body-parser')
module.exports = function (app) {
    
    let jsonParser = bodyParser.json()
    var controller = require('../controllers/Party');

    app.get('/parties', jsonParser, function(req, res, next){
        controller.getParties(req, res, next)
    })
}