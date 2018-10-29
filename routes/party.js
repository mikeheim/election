'use strict';
const bodyParser = require('body-parser')
module.exports = function (app) {
    
    let jsonParser = bodyParser.json()
    var controller = require('../controllers/Party');

    app.get('/parties', function(req, res, next){
        controller.getParties(req, res, next)
    })
    app.post('/party/create', jsonParser, function(req, res, next) {
        controller.create(req, res, next)
    })

}