const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users')
const connectLivereload = require("connect-livereload");
const livereload = require("livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));




const app = express()
const server = http.createServer(app)
const io = socketio(server)

//sets static folders
app.use(express.static(path.join(__dirname, 'public')))
app.use("/scripts", express.static(__dirname + '/node_modules/fullcalendar/'))
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});


const botName = 'EduBot'

// run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({name, room}) => {
        //socket.id is user id
        const user = userJoin(socket.id, name, room)
        console.log(user.name, user.room)

        socket.join(user.room)

        //welcomes current user
        socket.emit('message', formatMessage(botName, 'Welcome to EduCord!'))

        //Broadcast when user connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.name} has joined the chat`))

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })


    //listen for message from a user
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id)
        if (user) io.to(user.room).emit('message', formatMessage(user.name,msg))
    })
    socket.on('leaveRoom', () => {
        const user = userLeave(socket.id)
    
    
        if (user) {
        // sends message to all saying user disconnected
            let currRoom = user.room

            socket.leave(user.room)
            user.room = ""
            io.to(currRoom).emit('message', formatMessage(botName, `${user.name} has left the chat`))
            io.to(currRoom).emit('roomUsers', {
                room: currRoom,
                users: getRoomUsers(currRoom)
            })
        }
    })
})


const PORT = process.env.PORT || 3000

server.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`))



