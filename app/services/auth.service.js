const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ACCESS_SECRET, MONGO_COLLECTION } = require('../environment/environment');
const { getDb } = require('../config/db');


function haveUserByCookie(access_token){
    const token = access_token
    let user;
    if(token){
        user = jwt.verify(token, ACCESS_SECRET)
    }
    if(user) return user;
    else return null;
}

async function isPasswordAccepted(password,hashword){
    return await bcrypt.compare(password,hashword);
}

async function haveUserByDb(username){
    const db = await getDb()
    const users = await db.collection(MONGO_COLLECTION).find().toArray()
    console.log('kullanıcılar: ',users)
    const user = await db.collection(MONGO_COLLECTION).findOne({username: username})
    console.log('dbde aranan user sorgu sonucu bu : ', user)
    if(user) return user;
}

module.exports = { haveUserByDb,haveUserByCookie,isPasswordAccepted}