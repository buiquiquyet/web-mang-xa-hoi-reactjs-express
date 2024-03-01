const express = require('express')
const path = require('path')
const app = express()
const db = require('./config/db')
const morgan = require('morgan')
const cors = require('cors');
const router = require('./router')
const {eventEmitter} = require('./app/controller/CommentController');
const {eventEmitterCommentFeedback} = require('./app/controller/CommentFeedbackController');
const {eventEmitterMesseger} = require('./app/controller/MessegerChatController');
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

db.connect()
app.use(morgan('combined'))
app.use(cors())
//middleware để sử lý submit form
app.use(express.urlencoded({
    extended: true
  }))
app.use(express.json())
app.get('/', function (req, res) {
    res.send('Hello World')
  })
router(app)

//socket
eventEmitter.setMaxListeners(20);
eventEmitterCommentFeedback.setMaxListeners(20)
io.on('connection', (socket) => {
    console.log('Client connected', socket.id);

    const handleNewComment = (newComment) => {
      // Gửi comment mới cho client vừa kết nối
      socket.emit('newComment', newComment);
    };
    const handleNewCommentFeedback = (newComment) => {
      socket.emit('newCommentFeedback', newComment);
    };
    const handleNewMesseger = (newMesseger) => {
      socket.emit('newMesseger', newMesseger);
    };
    
    
    // Gắn trình lắng nghe sự kiện 'newComment' khi client kết nối
    eventEmitter.on('newComment', handleNewComment);
    eventEmitterCommentFeedback.on('newCommentFeedback', handleNewCommentFeedback);
    eventEmitterMesseger.on('newMesseger', handleNewMesseger);

   // Lắng nghe sự kiện 'disconnect' để loại bỏ trình lắng nghe khi client ngắt kết nối
    socket.on('disconnect', () => {
      console.log('Client disconnected', socket.id);
      // Loại bỏ trình lắng nghe sự kiện 'newComment' khi client ngắt kết nối
      eventEmitter.off('newComment', handleNewComment);
      eventEmitterCommentFeedback.off('newCommentFeedback', handleNewCommentFeedback);
      eventEmitterMesseger.off('newMesseger', handleNewMesseger);
    });
});

server.listen(3001, () => {
  console.log("SERVER IS RUN");
})
// app.listen(3001)