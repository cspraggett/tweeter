$(document).ready(function() {
  $(".new-tweet textarea").on('keydown', function() {
    let charCount = $(this).val().length;
    
    if (charCount > 140) {
      $(this).parent().children().children('.counter').addClass("below");
    } else {
      $(this).parent().children().children('.counter').removeClass("below");
    }
    $(this).parent().children().children('.counter').html(140 - charCount);
  });

  $(".new-tweet textarea").on('keyup', function() {
    let charCount = $(this).val().length;
    
    if (charCount > 140) {
      $(this).parent().children().children('.counter').addClass("below");
    } else {
      $(this).parent().children().children('.counter').removeClass("below");
    }
    $(this).parent().children().children('.counter').html(140 - charCount);
  });

});