'use strict';

var socketIO = require('socket.io');
var ot = require('ot');
var roomList = {};

module.exports = function (server) {
    var str = `//Write your code here and collaborate in real time\n\
    Welcome to TypeCode live collab
`;


    var io = socketIO(server);
    io.on('connection', function (socket) {
        // console.log(socket);
        console.log("connected");

        socket.on('joinRoom', function (data) {

            if (!roomList[data.room]) {
                var socketIoServer = new ot.EditorSocketIOServer(str, [], data.room, function (socket, cb) {
                    var self = this;
                    Task.findByIdAndUpdate(data.room, { content: self.document }, function (err) {
                        if (err) return cb(false);
                        cb(true);
                    })
                });
                roomList[data.room] = socketIoServer;
            }
            roomList[data.room].addClient(socket);
            roomList[data.room].setName(socket, data.username);

            socket.room = data.room;
            socket.join(data.room);
        });

        socket.on('chatMessage', function (data) {
            io.to(socket.room).emit('chatMessage', data);
        });

        socket.on('disconnect', function () {
            console.log("*******************************************************************");
            // console.log(socket)
            console.log(socket.room)
            socket.leave(socket.room);
            console.log("*******************************************************************");
        });
    })
}

