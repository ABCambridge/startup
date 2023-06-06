const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

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
    const unique = await checkCredentials(newUser.username,newUser.password);
    if(unique.length !== 0){
        return {
            success: false,
            message: "non-unique username or password used"
        };
    }
    else{
        const result = await users.insertOne(newUser);
        result.success = true;
        return result;
    }
}

async function updateUser(updatedUser){
    if(updatedUser.newUsername !== updatedUser.oldUsername){
        let response = users.find({username: updatedUser.newUsername});
        let result = await response.toArray();
        if(result.length !== 0){
            return {
                "success":false,
                "message":"Username is not unique"
            };
        }
    }

    let toInsert = {
        "username":updatedUser.newUsername,
        "password":updatedUser.newPassword,
        "authtoken":updatedUser.newUsername + "_token"
    };

    let insert = users.findOneAndReplace({username: updatedUser.oldUsername},toInsert);

    messages.updateMany({sender: updatedUser.oldUsername},{$set: {sender: updatedUser.newUsername}});
    messages.updateMany({recipient: updatedUser.oldUsername},{$set: {recipient: updatedUser.newUsername}});

    return {
        "success":true,
        "message":"updated to " + updatedUser.newUsername,
        "username":toInsert.username,
        "authtoken":toInsert.authtoken
    }
}

async function getUserList(){
    let userList = await users.find().toArray();
    return userList;
}

async function checkCredentials(checkUsername, checkPassword){
    const query = {$or: [{username: checkUsername},{password: checkPassword}]};
    const cursor = users.find(query);
    return await cursor.toArray();
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