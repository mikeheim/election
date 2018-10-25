'use strict';
const bodyParser = require('body-parser')
//export by default
module.exports = function (app) {
    
    let jsonParser = bodyParser.json()
    var controller = require('../controllers/Candidate');

    app.post('/candidate/create', jsonParser, function(req, res){
        controller.create(req, res)
    })

    app.get('/candidates', function(req, res) {
        controller.getAll(req, res)
    })
}