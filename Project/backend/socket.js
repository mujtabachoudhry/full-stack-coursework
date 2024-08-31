const socketIO = require('socket.io');

const socketServer = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Emit a welcome message to the connected user
    socket.emit('message', { text: 'Welcome!' });

    // Listen for incoming messages from the client
    socket.on('message', (message) => {
      console.log('Received message:', message);

      // Broadcast the message to all connected clients
      io.emit('message', message);
    });

    // Handle 'notification' event
    socket.on('connection', (notification) => {
      console.log('Received notification:', notification);

      // Broadcast the notification to the targeted user
      io.to(notification.reciever_id).emit('notification', notification);
    });

    // Disconnect event
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

module.exports = socketServer;
