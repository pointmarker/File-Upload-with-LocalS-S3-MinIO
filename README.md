# thumbnail-upload-with-multer-and-sharp

## author/contact

mehmet yagiz alanli

## instruction to build

the full version will include environment directory in app directory, with environment.js file with

#### PORT, MONGO_URI, MONGO_COLLECTION, MONGO_CLUSTER, DEFAULT_AVATAR_PATH, ACCESS_SECRET, REFRESH_SECRET

### sample variables for app/environment/environment.js file

PORT=3000

MONGO_CLUSTER = "cluster-name"
MONGO_COLLECTION = "collection-name"
MONGO_URI="mongodb+srv://<mongo_username>:<db_password>@<MONGO_CLUSTER>.gwioscu.mongodb.net/?retryWrites=true&w=majority&appName=<MONGO_CLUSTER>"

DEFAULT_AVATAR_PATH = "C:/Users/<user-name>/Desktop/Node/File-Upload-with-MinIO/app/public/assets/User-Profile-Focus--Streamline-Core.png"

ACCESS_SECRET / REFRESH_SECRET = access, refresh from services/token.service.js

##### bcrypt,crypto, cookie-parser, jsonwebtoken, mongodb, express, path, multer, sharp

packages also should install

## endpoint explanation

### /user/avatar

    this endpoint will use for a simple crud operation. these requests will be handled by functions which are controller functions of auth.controller.js file

##### POST

    post request will activate when client uploading a profile picture. it will controlled by avatarUploadController

##### PUT

    put request will activate when client reaches /profile endpoint, the page sends automatically to database and pull if there were a pic before.
    it will controlled by getAvatarController

##### DELETE

    delete request will activate when client wants to delete his picture. the program automatically changes the database info and loads default profile picture.
    it will controlled by deleteAvatarController

### /profile

    this endpoint will use for a simple profile page. client will get his own profile. this endpoint will be handled by a controller function by profile.controller.js file

##### GET

    get request will activate when client wants to log in, the page will be load after authorization.

### /auth/login

    this endpoint for authorization with jwt tokens. the token will load with username and created with special access / refresh tokens by server.
    will be handled by controller function of auth.controller.js

##### POST

    post request will activate when user wants to try login via homepage. will be handled by a loginConroller
