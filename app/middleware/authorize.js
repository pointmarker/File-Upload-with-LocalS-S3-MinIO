const jwt = require('jsonwebtoken');
const { ACCESS_SECRET } = require('../environment/environment');

async function authorize(req,res,next){

    const token = req.cookies.access_token;
    if(!token) return res.status(404).send('not auth');
    
    jwt.verify(token, ACCESS_SECRET, (err,payload) => {
        if(err) return res.status(401).send('not auth');
        console.log('authorized')
        next();
    })
}

module.exports = {authorize}