// Test / driver code (temporary). Eventually will get this from the server.
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

const validateData = (data => {
  return data.length > 1 && data.length <= 140;
});

const sendAlert = (text => {
  alert(text);
});

const escape = str => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const submitWithAjax = function() {
  const $form = $('main form');
  console.log('found the button');
  $form.submit(function(event) {
    event.preventDefault();
    console.log('this is this:', $('main form :first').val());
    if (validateData($('main form :first').val())) {
      console.log('Button clicked, performing ajax call...');
      $.ajax('/tweets/', {method: 'POST', data: $(this).serialize() })
        .then(() => {
          $('textarea').val('');
          $('.counter').text(140);
          loadtweets();
        });
    } else {
      sendAlert('Input not valid!');
    }
    // .then(renderTweets());
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

  //renderTweets(data);
  //$('#container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
