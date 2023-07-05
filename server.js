const express = require('express')
var cors = require('cors')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
const { send } = require('process')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('user-updated',(roomId,eventId)=>{
    socket.broadcast.to(roomId).emit('update-user',eventId);
  });
  socket.on('send-message', (roomId,userId) => {
    socket.broadcast.to(roomId).emit('message', userId);
  })
  socket.on('join-room', (roomId, userId) => {
    console.log(roomId, userId)

    socket.join(roomId)
    socket.broadcast.to(roomId).emit('user-connected', userId)
    console.log('New User Connected: ' + userId);


    
    socket.on('disconnect', () => {
      console.log(userId,"left room" ,roomId);
      socket.broadcast.to(roomId).emit('user-disconnected', userId)
    })
  })
  
})

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://gurupalsingh83:1234@cluster0.8twldbp.mongodb.net/db').then(() => {
    console.log('connected');
    const userRoutes = require('./peer_routes');
    app.use('/api/user', userRoutes);

});

server.listen(3000)