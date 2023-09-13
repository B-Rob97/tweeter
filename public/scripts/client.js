/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

let tweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giantssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
    },
    "created_at": 1694355519295
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1694441919295
  },
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giantssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
    },
    "created_at": 1694355519295
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1694441919295
  }
];

const createTweetElement = (tweet) => {
  const { name, avatars, handle } = tweet.user;
  const { text } = tweet.content;
  const created_at = new Date(tweet.created_at);
  const currentDate = new Date();
  const timeDifference = currentDate - created_at;
  let date;

  if (timeDifference < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
    date = `${hours} hours ${minutes} minutes ago`;
  } else {
    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    date = `${days} days ago`;
  }

  return `
    <article class="display-tweets-container">
      <header>
        <main class="user-profile-header">
          <div>
            <img src="${avatars}" alt="ProfilePic">  
            <h2>${name}</h2>
          </div>
          <h2 class="user-handle">${handle}</h2>
        </main>
        <p class="display-tweet-text">
          ${text}
        </p>
      </header>
      <footer class="display-tweets-footer">
        <time>
          ${date}
        </time>
        <div class="tweet-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`;
};

const renderTweets = (tweets) => {
  $.each(tweets, (index, tweet) => {
    $('.new-tweet').append(createTweetElement(tweet));
  });
};

$('document').ready(() => {
  renderTweets(tweets);
});