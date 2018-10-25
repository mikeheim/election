'use strict';
const bodyParser = require('body-parser')
//export by default
module.exports = function (app) {
    
    let jsonParser = bodyParser.json()
    var controller = require('../controllers/Election');

    app.post('/election/create', jsonParser, function(req, res){
        controller.create(req, res)
    })

    app.post('/election/vote', jsonParser, function(req, res){
        controller.vote(req, res)
    })

    app.get('/elections', function(req, res){
        controller.getActiveElections(req, res)
    })
}
