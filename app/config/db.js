/**
 * this module for connecting our database
 * creating a mongo client to connect a database
 * and making connection settings
 * it will export its mongoRun & getDb functions to other pages
 * using in server.js
 */

const env = require('../environment/environment')
const {MongoClient, ServerApiVersion} = require('mongodb')
let client; 

async function mongoStart(){
    //create a client
    client = new MongoClient(env.MONGO_URI,{
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    })

    //try to connect client to server
    try {
        console.log('try connecting to mongo server')

        await client.connect()
        await client.db('admin').command({ping:1})
        console.log('server connected to mongo')
        return client 
    } catch (error) {
        console.error('mongo connection fails on: ',error)
    }
}

async function mongoClose(){
    if(client){
        try {
            await client.close()    
            console.log('mongo connection ended')
        } catch (error) {
            console.log('mongo server not closing: ',error)
        }
    }
}

let db;
async function connectDb(client) {
    db = client.db(env.MONGO_CLUSTER)
}

function getDb(){
    if(!db) throw new Error('database cant find');
    return db;
}

// connect mongo client
async function mongoRun() {
    const client = await mongoStart()
    connectDb(client);
}

module.exports = { getDb, mongoRun,mongoClose }