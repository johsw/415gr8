var config  = require('./../../config');
var mongodb = require('mongodb');

count = 0;
var server = new mongodb.Server("127.0.0.1", 27017, {safe:false});
new mongodb.Db('415gr8', server, {}).open(function (error, client) {
   
  if (error) {
    throw error;
  }

  var collection = new mongodb.Collection(client, 'counter');
  
  //Setup socket
  var io = require('socket.io').listen(config.wsPort);
  io.sockets.on('connection', function (socket) {
    socket.on('disconnect', function () {
      console.log('disc');
    });
  });


  //Recieve ajax call
  var http = require('http');
  http.createServer(function (req, res) {
    
    if (req.url == '/ajax/update') {
      incrementCount(function(count) {
        sendCount(res, count);
      });
    }
    if (req.url == '/ajax/read') {
      getCount(function(count) {
        sendCount(res, count);
      });
    }
    if (req.url != '/ajax/read' && req.url != '/ajax/update') {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write("404 Not Found\n");
      res.end();
    }
  }).listen(config.ajaxPort);

  
  var sendCount = function(res, count) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({ count: count }));
    res.end();

  }

  var getCount = function(callback){
    collection.find({name: 'counter'}, {limit:1}).toArray(function(err, docs) {
      callback(docs[0].count);
    });
  };

  var incrementCount = function(callback) {
    collection.update({ name: 'counter' }, { $inc: { count : 1 } }, true ,
      function(err) {
        if (err) {
          console.warn(err.message);
        } else {
          collection.find({name: 'counter'}, {limit:1}).toArray(function(err, docs) {
            callback(docs[0].count);
            io.sockets.emit('update', docs[0].count);
          });
        }
    });
  };
});
