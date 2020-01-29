// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

// to add it to the page so we can make sure it's got all the right elements, classes, etc.

let  = testData => `<article class="tweet"><header><span><img src="${testData.user.avatars}"> ${testData.user.name}</span><span class="userName">${testData.user.handle}</span></header><section class="tweet"><p>${testData.content.text}</p></section><footer><span>${testData.created_at}</span><span class="links">various links</span></footer></article>`;
console.log(t);

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet);