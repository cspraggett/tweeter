// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const getDate = ((date) => {
  const today = new Date();
  const postDate = new Date(date);
  const diff = (today.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);


  
  // console.log(`${diff}`);
  return Math.floor(diff);
});

const createTweetElement = (tweetData => {
  const {name, avatars, handle} = tweetData.user;
  const {text} = tweetData.content;
  const {created_at} = tweetData;
  getDate(created_at);
  return `<article class="tweet"><header><span><img src="${avatars}"> ${name}</span><span class="userName">${handle}</span></header><section class="tweet"><p>${text}</p></section><footer><span>${getDate(created_at)} days ago</span><span class="links"><a href="/">Various links</a> </span></footer></article>`;
});

const renderTweets = (tweets => {
  for (const tweet of tweets) {
    $('#container').append(createTweetElement(tweet));
  }
});

$(document).ready(() => {
  renderTweets(data);
  //$('#container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
