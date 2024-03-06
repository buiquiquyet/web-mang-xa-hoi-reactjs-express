// socketHandler.js


const {eventEmitter} = require('./../controller/CommentController');
const {eventEmitterCommentFeedback} = require('./../controller/CommentFeedbackController');
const {eventEmitterMesseger} = require('./../controller/MessegerChatController');
const User = require('./../model/User')
function handleSocket(io) {
    eventEmitter.setMaxListeners(20);
    eventEmitterCommentFeedback.setMaxListeners(20);
    eventEmitterMesseger.setMaxListeners(20);

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

        socket.on('login', async (userId) => {
            await User.updateOne({ _id: userId }, { isOnline: true, socketId: socket.id });
            io.emit('userStatus', { userId, isOnline: true });
        });

        // Gắn trình lắng nghe sự kiện 'newComment' khi client kết nối
        eventEmitter.on('newComment', handleNewComment);
        eventEmitterCommentFeedback.on('newCommentFeedback', handleNewCommentFeedback);
        eventEmitterMesseger.on('newMesseger', handleNewMesseger);

        // Lắng nghe sự kiện 'disconnect' để loại bỏ trình lắng nghe khi client ngắt kết nối
        socket.on('disconnect', async () => {
            console.log('Client disconnected', socket.id);
            // Loại bỏ trình lắng nghe sự kiện 'newComment' khi client ngắt kết nối
            eventEmitter.off('newComment', handleNewComment);
            eventEmitterCommentFeedback.off('newCommentFeedback', handleNewCommentFeedback);
            eventEmitterMesseger.off('newMesseger', handleNewMesseger);

            await User.updateOne({ socketId: socket.id }, { isOnline: false });
            io.emit('userStatus', { userId: socket.id, isOnline: false });
        });
    });
}

module.exports = handleSocket;
