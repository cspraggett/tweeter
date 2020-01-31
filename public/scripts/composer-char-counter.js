// checks both the keyUp and keyDown of the new-tweet textarea and updates the character counter.
// There is a bug... It won't update the character count when text is pasted into the textarea using the mouse.+
$(document).ready(() => {
  $('.new-tweet textarea').on('keydown', function () {
    const charCount = $(this).val().length;

    if (charCount > 140) {
      $(this).parent().children().children('.counter')
        .addClass('below');
    } else {
      $(this).parent().children().children('.counter')
        .removeClass('below');
    }
    $(this).parent().children().children('.counter')
      .html(140 - charCount);
  });

  $('.new-tweet textarea').on('keyup', function () {
    const charCount = $(this).val().length;

    if (charCount > 140) {
      $(this).parent().children().children('.counter')
        .addClass('below');
    } else {
      $(this).parent().children().children('.counter')
        .removeClass('below');
    }
    $(this).parent().children().children('.counter')
      .html(140 - charCount);
  });
});
