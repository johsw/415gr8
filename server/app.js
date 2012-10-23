config = require('./../../config');
count = 0;
console.log(config);

var io = require('socket.io').listen(config.port);

io.sockets.on('connection', function (socket) {
  io.sockets.emit('update', count);
  
  console.log('CONNECTED');
  socket.on('increment', function () {
    console.log('incr');
    count++;
    socket.emit('update', count);
  });
  socket.on('disconnect', function () {
    console.log('disc');
  });
});