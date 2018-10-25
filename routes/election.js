'use strict';
const bodyParser = require('body-parser')
module.exports = function (app) {
    
    let jsonParser = bodyParser.json()
    var controller = require('../controllers/Election');

    app.post('/election/create', jsonParser, function(req, res, next){
        controller.create(req, res, next)
    })

    app.post('/election/vote', jsonParser, function(req, res, next){
        controller.vote(req, res, next)
    })

    app.get('/elections', function(req, res, next){
        controller.getActiveElections(req, res, next)
    })
}
