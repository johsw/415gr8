socket = io.connect('http://ws.415gr8.dk');

$(document).ready(function() {
  $.getJSON('/read',{},
   function(json){
      console.log(json);
  });
  
  
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
    $.getJSON('/update',{},
     function(json){
        console.log(json);
    });
    return false;
  });
});
