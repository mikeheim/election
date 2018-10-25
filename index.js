const express = require('express')
//Individual route files
const authRoutes = require('./routes/authenticate')
const candidateRoutes = require('./routes/candidate')
const partyRoutes = require('./routes/party')
const electionRoutes = require('./routes/election')
const jwtUtil = require('./util/jwtutil')
const app = express()
const router = express.Router()
const port = process.env.PORT || 4200

router.get("/", function(req, res, next) {
    res.send("WELCOME TO MY API")
})

authRoutes(app)
partyRoutes(app)
candidateRoutes(app)
electionRoutes(app)

//Ensure each request is authenticated
app.use(async (req, res) => {

    //Could see use for a whitelist here
    if(req.path.indexOf('/authenticate') !== -1)
    {
        return req.next();
    }
    try{
        const token = req.headers('jwt');
        const isValid = await jwtUtil.verify(token, SECRET)
        if(isValid)
        {
            return req.next()
        }
        res.status('401').send('Unauthorized')
    }catch(e){
        res.status('401').send('Unauthorized')
    }
})

app.listen(port)
