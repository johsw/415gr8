socket = io.connect('http://localhost', {port:8080});

$(document).ready(function() {
  $('#quote-link').click(function(){
    $('#quote').show();
    return false;
  })
  socket.on('connect', function () {
    socket.on('update', function (count) {
      $('#counter').hide().text(count).fadeIn("slow");
    });
  });
  $('#button').click(function() {
    socket.emit('increment');
    return false;
  });
});
