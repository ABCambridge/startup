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
    if(unique !== 0){
        return {
            success: false,
            message: "non-unique username or password used"
        };
    }
    else{
        const result = await users.insertOne(newUser);
        result.success = true;
        console.log(result);
        return result;
    }//DOUBLE check on the return value if there are zero results
}

async function updateUser(updatedUser){
//TODO: do this last
}

async function getUserList(){
    let userList = await users.find().toArray();
    return userList;
}

async function checkCredentials(checkUsername, checkPassword){
    const query = {$or: [{username: checkUsername},{password: checkPassword}]};
    const cursor = users.find(query);
    return (await cursor.toArray()).length;//TODO make sure this doesn't need "()"
}

module.exports = {getMessages, putMessage, addUser, updateUser, getUserList, checkCredentials};