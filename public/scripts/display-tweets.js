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

const createArticle = (tweet) => {
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
    <article>
      <header>
        <main>
          <div>
            <img src="${avatars}" alt="ProfilePic">  
            <h2>${name}</h2>
          </div>
          <h2>${handle}</h2>
        </main>
        <p>
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
    $('.new-tweet').append(createArticle(tweet));
  });
};

$('document').ready(() => {
  renderTweets(tweets);
});