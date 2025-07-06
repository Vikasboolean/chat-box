const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const ioi = new Server(server);
const port = 5000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

ioi.on('connection', (socket) => {
    console.log('a user connected');

    // Listen for "user joined" event
    socket.on('user joined', (username) => {
        // Broadcast a message to all clients that a new user has joined
		console.log("user in hahaha :)");
        ioi.emit('user joined', username);
    });

    socket.on('send name', (username) => {
        ioi.emit('send name', username);
    });

    socket.on('send message', (chat) => {
        ioi.emit('send message', chat);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected OoNo :(');
    });
});

server.listen(port, () => {
    console.log(`Server is listening at the port: ${port}`);
});
