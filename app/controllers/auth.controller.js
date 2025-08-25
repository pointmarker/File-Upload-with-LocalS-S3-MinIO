const {  ACCESS_SECRET, REFRESH_SECRET } = require('../environment/environment');
const { isPasswordAccepted, haveUserByDb } = require('../services/auth.service');
const jwt = require('jsonwebtoken');

let refreshTokens = {}
exports.loginController = async(req,res) => {
    const {username, password} = req.body

    const user = await haveUserByDb(username)
    if(user){
        const hashword = user.passwordHash;
        if(isPasswordAccepted(password,hashword)){

            const refreshToken = generateRefreshToken({username})
            const accessToken = generateAccessToken({username})

            if(!refreshTokens[username]){
                refreshTokens[username] = []
            }

            refreshTokens[username].push(refreshToken)
            res.cookie('refresh_token', refreshToken,{
                httpOnly: true,
                secure: false
            })

            res.cookie('access_token', accessToken,{
                httpOnly: true,
                secure: false
            })

            res.status(200).send({message: 'success'});

        }else{
            res.status(401).send('wrong password')
        }
    }else{
        res.status(404).send('there is no username named ',username)
    }
}

function generateAccessToken(user){
    return jwt.sign({username: user.username},ACCESS_SECRET,{expiresIn: '1h'})
}

function generateRefreshToken(user){
    return jwt.sign({username: user.username},REFRESH_SECRET, {expiresIn: '7d'})
}
