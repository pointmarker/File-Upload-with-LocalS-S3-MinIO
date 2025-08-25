const { getDb } = require("../config/db");
const env = require('../environment/environment')

async function addPicture(id,username,email, avatarUrl){
    const db = await getDb();
    const res = db.collection(env.MONGO_COLLECTION).insertOne({
        id,
        username,
        email,
        avatarPath
    })
}