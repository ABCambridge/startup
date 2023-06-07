const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const crypt = require('bcrypt');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const db = client.db('FastChat');
const users = db.collection('Users');
const messages = db.collection('Messages');

(async function testConnection(){
    await client.connect();
    await db.command({ping: 1});
})().catch((ex) => {
    console.log(`received error ${ex.message}`);
    process.exit(1);
});

async function getMessages(clientUsername){
    const query = {$or: [{recipient: clientUsername},{sender:clientUsername}]};
    const cursor = messages.find(query);
    return cursor.toArray();
}

async function putMessage(message){
    const result = await messages.insertOne(message);
    return result;
}

async function addUser(newUser){
    const unique = await validateCredentials(newUser.username);
    if(unique !== null){
        return {
            success: false,
            message: "non-unique username"
        };
    }
    else{
        const result = await users.insertOne(newUser);
        result.success = true;
        return result;
    }
}

async function updateUser(updatedUser){
    let previous = await users.findOne({username: updatedUser.oldUsername});

    if(updatedUser.newUsername !== previous.username){
        let result = await validateCredentials(updatedUser.newUsername);
        if(result !== null){
            return {
                "success":false,
                "message":"Username is not unique"
            };
        }
    }

    let hash = await crypt.hash(updatedUser.newPassword,10);
    let toInsert = {
        "username":updatedUser.newUsername,
        "password":hash,
        "authtoken":previous.authtoken
    };

    let insert = users.findOneAndReplace({username: previous.username},toInsert);

    messages.updateMany({sender: previous.username},{$set: {sender: updatedUser.newUsername}});
    messages.updateMany({recipient: previous.username},{$set: {recipient: updatedUser.newUsername}});

    return {
        "success":true,
        "message":"updated " + previous.username + " to " + toInsert.username,
        "username":toInsert.username,
        "authtoken":toInsert.authtoken
    }
}

async function getUserList(){
    let userList = await users.find().toArray();
    return userList;
}

async function validateCredentials(checkUsername){
    const query = {username: checkUsername};
    const cursor = await users.findOne(query);
    return cursor;
}

async function findByAuthtoken(checkAuthtoken){
    const query = {authtoken: checkAuthtoken};
    const cursor = await users.findOne(query);
    return cursor;
}

module.exports = {getMessages, putMessage, addUser, updateUser, getUserList, validateCredentials, findByAuthtoken};