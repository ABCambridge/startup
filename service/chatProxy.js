const { WebSocketServer } = require('ws');
const uuid = require('uuid');
const database = require('./database.js');

function chatProxy(httpServer){
    const wss = new WebSocketServer({noServer: true});

    httpServer.on('upgrade',(request,socket,head) => {
        wss.handleUpgrade(request,socket,head,function done(ws){
            wss.emit('connection', ws, request);
        });
    });

    let connections = [];

    wss.on('connection',(ws) => {
        let connection = {
            id: uuid.v4(),
            socket: ws,
            alive: true,
            hostUser: ""
        };
        connections.push(connection);

        ws.on('message',function message(bytes) {
            let data = JSON.parse(bytes.toString());
            if(data.type === "hostUserUpdate"){
                connection.hostUser = data.hostUser;
            }
            else if(data.type === "message"){
                let message = JSON.parse(data.message);
                database.putMessage(message);
                
                connections.forEach((activeUser) => {
                    if(activeUser.hostUser === message.recipient){
                        activeUser.socket.send(JSON.stringify({
                            "type":"message",
                            "message":data.message
                        }));
                    }
                });
            }
        });

        ws.on('close', () => {
            connections.findIndex((cursor, index) => {
                if(cursor.id === connection.id){
                    connections.splice(index,1);
                    return true;
                }
            });
        });

        ws.on('pong', () => {
            connection.alive = true;
        });
    });

    setInterval(() => {
        connections.forEach((connection) => {
            if(!connection.alive){
                connection.socket.terminate();
            }
            else{
                connection.alive = false;
                connection.socket.ping();
            }
        });
    }, 10000);
}

module.exports = {chatProxy};