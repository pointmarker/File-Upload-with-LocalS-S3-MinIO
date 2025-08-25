const crypto = require('crypto');

const access = generateRandom64BitToken()
const refresh = generateRandom64BitToken()

function generateRandom64BitToken(){
    return crypto.randomBytes(64).toString('hex')
}

module.exports = {access,refresh}