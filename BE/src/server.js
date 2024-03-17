const express = require('express')
const path = require('path')
const app = express()
const db = require('./config/db')
const morgan = require('morgan')
const cors = require('cors');
const router = require('./router')
const cron = require('node-cron');//lập lịch xóa feed
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const FeedController = require('./app/controller/FeedController')
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});
const handleSocket = require('./app/socket/index');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

db.connect()
app.use(morgan('combined'))
app.use(cors())
//middleware để sử lý submit form
app.use(express.urlencoded({
    extended: true
  }))
app.use(express.json())

router(app)
//socket
handleSocket(io);

//lập lịch
cron.schedule('0 0 * * *', FeedController.deleteFeedAfter24hours);

server.listen(3001, () => {
  console.log("SERVER IS RUN");
})
// app.listen(3001)