'use strict';
const bodyParser = require('body-parser')
module.exports = function (app) {
    
    let jsonParser = bodyParser.json()
    var user = require('../controllers/User');

    app.post('/user/create', jsonParser, function(req, res, next){
        user.create(req, res, next)
    })
}