//Express library
const express = require('express')
//Individual route files
const authRoutes = require('./routes/authenticate')
const candidateRoutes = require('./routes/candidate')
const partyRoutes = require('./routes/party')
const electionRoutes = require('./routes/election')

//Utility for handling JWT
const jwtUtil = require('./util/jwtutil')
//Initialize
const app = express()
//Default port
const port = process.env.PORT || 4200

//Add routes
authRoutes(app)
partyRoutes(app)
candidateRoutes(app)
electionRoutes(app)

//Ensure each request is authenticated
app.use(async (req, res, next) => {

    //Could see use for a whitelist here, but for now only allow unauthenticated reqests to authenticate
    if(req.path.indexOf('/authenticate') !== -1)
    {
        return req.next();
    }
    try{
        //validate the jwt
        const token = req.headers('jwt');
        const isValid = await jwtUtil.verify(token, SECRET)
        if(isValid)
        {
            //This is good, we can move on
            return req.next()
        }
        res.status('401').send('Unauthorized')
    }catch(e){
        next(e)
    }
})

//Default error handler. All hard errors should come through here
app.use(function (err, req, res, next) {
    console.error(err)
    res.status(500).send('Server error')
  })

app.listen(port)
