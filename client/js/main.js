socket = io.connect('http://ws.415gr8.dk');

$(document).ready(function() {
  $.getJSON('/ajax/read',{},
   function(json){
     $('#counter').hide().text(json.count).fadeIn("slow");
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
    $.getJSON('/ajax/update',{},
     function(json){
      $('#counter').hide().text(json.count).fadeIn("slow");
    });
    return false;
  });
});
