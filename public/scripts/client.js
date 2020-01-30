// moveErrorMessage is a helper function to remove error message when the user pressess a key in the textarea.
const moveErrorMessage = () => {
  $('main form').keydown(() => {
    $('#error').css('visibility', 'hidden');
  });
};

// checkForError checks form input for more than 0 and less than 141 characters and displays an
// appropriateerror message
const checkForError = ((data) => {
  console.log('in check');
  if (!validateData(data)) {
    let message = "Your entry is too long.";
    if (data.length < 1) {
      message = 'Your entry is too short!';
    }
    $('#error').css("visibility", "visible");
    // $('#error').css('visibility', 'show');
    $('#error').text(message);
    return false;
  }
  return true;
});

const slide = (() => {
  $('.button').click(() => {
    $('.new-tweet').slideToggle('slow');
  });
});

const validateData = (data => {
  return data.length > 1 && data.length <= 140;
});

const escape = str => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const submitWithAjax = function() {
  const $form = $('main form');
  $form.submit(function(event) {
    event.preventDefault();
    moveErrorMessage();
    if (checkForError($('main form :first').val())) {
      $.ajax('/tweets/', {method: 'POST', data: $(this).serialize() })
        .then(() => {
          $('textarea').val('');
          $('.counter').text(140);
          loadtweets();
        });
    }
  });
};

const loadtweets = function() {
  console.log('Loading tweets');
  $.ajax({url: '/tweets', method: 'GET', dataType: 'JSON'})
    .then(response => {
      renderTweets(response);
    });
};

const getDate = ((date) => {
  const today = new Date();
  const postDate = new Date(date);
  const diff = (today.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);
  return Math.floor(diff);
});

const createTweetElement = (tweetData => {
  const {name, avatars, handle} = tweetData.user;
  const {text} = tweetData.content;
  const {created_at} = tweetData;
  getDate(created_at);
  return `<article class="tweet"><header><span><img src="${escape(avatars)}"> ${escape(name)}</span><span class="userName">${escape(handle)}</span></header><section class="tweet"><p>${escape(text)}</p></section><footer><span>${getDate(created_at)} days ago</span><span class="links"><a href="/">Various links</a> </span></footer></article>`;
});

const renderTweets = (tweets => {
  $('.display').empty();
  for (const tweet of tweets.reverse()) {
    $('.display').append(createTweetElement(tweet));
  }
});



$(document).ready(() => {
  loadtweets();
  submitWithAjax();
  slide();
});
