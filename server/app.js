var config = require('./../../config');
var mongodb = require('mongodb');
count = 0;
var server = new mongodb.Server("127.0.0.1", 27017, {});
console.log(config);
new mongodb.Db('415gr8', server, {}).open(function (error, client) {
  
  if (error) throw error;
  var collection = new mongodb.Collection(client, 'counter');

  var io = require('socket.io').listen(config.port);

  io.sockets.on('connection', function (socket) {
    collection.find({name: 'counter'}, {limit:1}).toArray(function(err, docs) {
      io.sockets.emit('update', docs[0].count);
    });
    socket.on('increment', function () {
      collection.update({ name: 'counter' }, { $inc: { count : 1 } }, true ,
        function(err) {
          if (err) {
            console.warn(err.message);
          } else {
            console.log('successfully updated');
          }
          collection.find({name: 'counter'}, {limit:1}).toArray(function(err, docs) {
            io.sockets.emit('update', docs[0].count);
          });
      });      
    });
    socket.on('disconnect', function () {
      console.log('disc');
    });
  });
});