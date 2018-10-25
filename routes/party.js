'use strict';
const bodyParser = require('body-parser')
//export by default
module.exports = function (app) {
    
    let jsonParser = bodyParser.json()
    var controller = require('../controllers/Party');

    app.get('/parties', jsonParser, function(req, res){
        controller.getParties(req, res)
    })
}