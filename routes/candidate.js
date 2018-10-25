'use strict';
const bodyParser = require('body-parser')
module.exports = function (app) {
    
    let jsonParser = bodyParser.json()
    var controller = require('../controllers/Candidate');

    app.post('/candidate/create', jsonParser, function(req, res, next){
        controller.create(req, res, next)
    })

    app.get('/candidates', function(req, res, next) {
        controller.getAll(req, res, next)
    })
}