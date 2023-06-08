const { WebSocketServer } = require('ws');
const uuid = require('uuid');

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

        ws.on('message',function message(data) {
            console.log('got to message');
            if(data.type === "hostUserUpdate"){
                connection.hostUser = data.hostUser;
                //TODO: this should also be used when a user changes their username
            }
            else if(data.type === "message"){
                //TODO: load the message into the database
                //TODO: pass any other messages to the recipientUser
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