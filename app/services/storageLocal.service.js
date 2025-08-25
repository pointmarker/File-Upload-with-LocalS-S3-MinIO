const { haveUserByCookie } = require("./auth.service");
const { getDb } = require("../config/db");
const { MONGO_COLLECTION,DEFAULT_AVATAR_PATH } = require("../environment/environment");


exports.changeUrlOnDb = async(req, thumbnailPATH) => {
    const db = await getDb()
    const user = haveUserByCookie(req.cookies.access_token)
    if(user){
        console.log('changeurl çalışıyor')
        console.log("user: ",user)
        console.log("req.file: ",req.file.path)
        try {
            const res =await db.collection(MONGO_COLLECTION).updateOne(
                {username: user.username},
                { $set: {avatarPath: thumbnailPATH}}
            )

            console.log(res)
        } catch (error) {
            console.error("changeUrlOnDb hatası",error)
        }
    }else{
        return null
    }
}

exports.getAvatarFromDb = async(req) => {
    const db = await getDb();
    let user = haveUserByCookie(req.cookies.access_token)
    if(user){
        user = await db.collection(MONGO_COLLECTION).findOne({username: user.username})
        return user.avatarPath
    }else{
        return null
    }
}

exports.makeDefaultAvatarPathToDb = async(req) => {
    const db = await getDb();
    let user = haveUserByCookie(req.cookies.access_token)
    if(user){
        try {
            await db.collection(MONGO_COLLECTION).updateOne(
                {username: user.username},
                { $set: {avatarPath: ""}}
            )
        } catch (error) {
            console.error('makeDefaultAvatarPathToDb hatası, ',error)
            return null
        }
    }else return null
}
