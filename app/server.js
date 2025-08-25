const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
const path = require('path')
const router = require('./routes/index.route')
const env = require('./environment/environment');
const {  mongoRun ,mongoClose } = require('./config/db');

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))
app.use('/',router)

// connect mongo db
mongoRun()

//getting static homepagae
app.get('/', [(req,res,next) =>{
    console.log('LOGGED INTO LANDING PAGE');next();
} ,(req,res) => {
    res.status(200).sendFile(path.join(__dirname,'public','pages','index.html'))
}])


// what to do when try to close server
process.on('SIGINT',async() => {
    console.log('server closing')
    await mongoClose()
    process.exit(0)
})

app.listen(env.PORT, () => console.log('server running on PORT', env.PORT))