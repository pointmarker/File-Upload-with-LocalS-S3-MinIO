const { changeUrlOnDb, getAvatarFromDb, makeDefaultAvatarPathToDb } = require("../services/storageLocal.service");
const sharp = require('sharp')
const fs = require('fs');
const { DEFAULT_AVATAR_PATH } = require("../environment/environment");
exports.avatarUploadController = async(req,res) => {
    
    try {
        const filePath = req.file.path
        const thumbnailPath = filePath.replace(/(\.[\w]+)$/,"_thumb$1")

        await sharp(filePath)
            .resize(48,48)
            .toFile(thumbnailPath)

        const thumbnailUrl = "/assets/" + req.file.filename.replace(/(\.[\w]+)$/, "_thumb$1");

        await changeUrlOnDb(req,thumbnailPath);

        res.status(200).send({
            message: "upload successfull",
            file: req.file.filename,
            thumbnail: thumbnailUrl
        })  

    } catch (error) {
        console.error('avataruploadController hatası', error)
        res.status(500).send('upload failed')
    }
}

exports.getAvatarController = async(req,res) => {
    const avatarPath = await getAvatarFromDb(req);
    console.log('getAvatara girdi',avatarPath)
    if(avatarPath){
        console.log('avatarPath null değile girdi')
        if(avatarPath.trim() !== ""){
            console.log('avatarPath boş değile girdi')
            const urlPath = avatarPath.split("public")[1].replace(/\\/g, "/"); 
            console.log('cevap gönderiyor')
            res.status(200).send({
                message: "avatar fetched",
                thumbnail: urlPath
            })  
        }else{
            console.log('avatar path boş olduğu için default koyuyor')
            res.status(200).send({
                message: "avatar fetched",
                thumbnail: "/assets/User-Profile-Focus--Streamline-Core.png"
            })  
        }
    }else{
        console.log('avatarPath null ise',avatarPath)
        res.status(404).send({message: 'not found'})
    }
}

exports.deleteAvatarController = async(req,res) => {
    try {
        await makeDefaultAvatarPathToDb(req)
        const dirPath = "C:/Users/90533/Desktop/node/File-Upload-with-MinIO/app/public/assets/"
        fs.readdir(dirPath,(err, files) => {
            files.forEach(f =>{
                if(!f.startsWith('User')){
                    fs.unlink(dirPath + f,(err) => {if(err) console.log(err)})
                }
            })
        })
        res.status(200).json({
            message: 'successfully changed',
            thumbnail: DEFAULT_AVATAR_PATH.split("public")[1]
        })
    } catch (error) {
        res.status(403).send({message: "deletion error"})
    }
}