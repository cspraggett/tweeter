// checkForError checks form input for more than 0 and less than 141 characters and displays an
// appropriateerror message
const checkForError = ((data) => {
  if (!validateData(data)) {
    let message = "Your entry is too long.";
    if (data.length < 1) {
      message = 'Your entry is too short!';
    }
    $('#error').css("visibility", "visible");
    $('#error').slideDown();
    $('#error').text(message);
    return false;
  }
  return true;
});

// slide pushes the new-tweets section up and down when the new tweets button is pushed.
const slide = (() => {
  $('.button').click(() => {
    $('.new-tweet').slideToggle('slow');
  });
});

const validateData = (data => {
  return data.length >= 1 && data.length <= 140;
});

// escape cleans user input text to avoid XXS attacks.
const escape = str => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// submitWithAjax reads the input from the new-tweet form and then checks if the data is valid
// wit checkForError and then uses ajax to POST the new tweet into the database.
// it then calls loadTweets to load the new tweet onto the page.
const submitWithAjax = function() {
  const $form = $('main form');
  $form.submit(function(event) {
    event.preventDefault();
    if (checkForError($('main form :first').val())) {
      $.ajax('/tweets/', {method: 'POST', data: $(this).serialize() })
        .then(() => {
          $('#error').slideUp();
          $('textarea').val('');
          $('.counter').text(140);
          loadTweets();
        });
    }
  });
};

// loadTweets GETS tweets from the DB and then call renderTweets.
const loadTweets = function() {
  $.ajax({url: '/tweets', method: 'GET', dataType: 'JSON'})
    .then(response => {
      renderTweets(response);
    });
};

// getDate sends the difference between the current date and the date submitted.
const getDate = ((date) => {
  const today = new Date();
  const postDate = new Date(date);
  const diff = (today.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);
  return Math.floor(diff);
});

// createTweetElement takes in the data from the database and parses it into HTML.
const createTweetElement = (tweetData => {
  const {name, avatars, handle} = tweetData.user;
  const {text} = tweetData.content;
  const {created_at} = tweetData;
  const flag = `<img src='../images/flag.png'/>`;
  const retweet = `<img src='/images/sync.png'/>`;
  const like = `<img src='/images/like.png'/>`;
  getDate(created_at);
  return `<article class="tweet"><header><span><img src="${escape(avatars)}"> ${escape(name)}</span><span class="userName">${escape(handle)}</span></header><section class="tweet"><p>${escape(text)}</p></section><footer><span>${getDate(created_at)} days ago</span><span class="links">${flag} ${retweet} ${like}</span></footer></article>`;
});

// render Tweets inserts the tweets in HTML to the main app page.
const renderTweets = (tweets => {
  $('.display').empty();
  for (const tweet of tweets.reverse()) {
    $('.display').append(createTweetElement(tweet));
  }
});



$(document).ready(() => {
  loadTweets();
  submitWithAjax();
  slide();
});