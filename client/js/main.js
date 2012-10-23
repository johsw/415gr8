socket = io.connect('http://localhost', {port:8080});

$(document).ready(function() {
  socket.on('connect', function () {
    socket.on('update', function (count) {
      $('#counter').hide();
      $('#counter').text(count).fadeIn("slow");
    });
  });
  $('#button').click(function() {
    socket.emit('increment');
  });
});
