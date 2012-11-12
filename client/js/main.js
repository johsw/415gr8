socket = io.connect('http://ws.415gr8.dk');

$(document).ready(function() {
  vlicked = false;
  $.getJSON('/ajax/read',{},
   function(json){
     $('#counter').text(json.count).fadeIn("slow");
  });
  
  
  $('#quote-link').click(function(){
    $('#quote').show();
    return false;
  })
  socket.on('connect', function () {
    socket.on('update', function (count) {
      $('#counter').text(count).fadeIn("slow");
    });
  });
  $('#button').click(function() {
    if (!$(this).hasClass('inactive')) {
      $('#button').addClass('inactive').text('Tak for deltagelsen!');
      $.getJSON('/ajax/update',{},
       function(json){
        $('#counter').text(json.count).fadeIn("slow");

      });
    }
    return false;
  });
});
