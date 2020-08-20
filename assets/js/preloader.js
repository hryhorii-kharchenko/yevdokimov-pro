//PRELOADER

var timerID = 0;

jQuery("#preloader").ready( function($) { 
  
  $("#preloader").css("animation", "initial");
  $("#preloader-overlay").css("animation", "initial");
  $("#preloader").css("opacity", 1);
  $("preloader-overlay").css("opacity", 1);

  function blinker() {
    $("#preloader").fadeOut(500).fadeIn(500);
  }
  
  timerID = setInterval(blinker, 1200);

// });
  
}).each(function() {
  if(this.complete) $(this).ready();
});


$(window).on("load", function(){
  clearInterval(timerID);
  $("#preloader").stop().fadeOut('slow',function(){$(this).remove();});
  $('#preloader-overlay').fadeOut('slow',function(){$(this).remove();});
});