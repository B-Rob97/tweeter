/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('document').ready(() => {

  const $displayTweetsContainer = $('#new-tweet-container');

  const createTweetElement = (tweet) => {
    const { name, avatars, handle } = tweet.user;
    const { text } = tweet.content;
    const date = timeago.format(tweet.created_at);

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
    $displayTweetsContainer.empty();
    $.each(tweets, (index, tweet) => {
      $('#new-tweet-container').prepend(createTweetElement(tweet));
    });
  };

  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
      success: (tweets) => {
        console.log(tweets);
        renderTweets(tweets);
      }
    });
  };

  loadTweets();

  const $tweetForm = $("#new-tweet-form");

  $tweetForm.on('submit', (event) => {
    event.preventDefault();
    
    const tweetText = $tweetForm.find('textarea[name="text"]').val();
    
    if (tweetText.length > 140) {
      window.alert("Tweet is too long!");
      return;
    }

    if (!tweetText.trim()) {
      window.alert("Tweet content is not present!");
      return;
    }

    const tweetData = $tweetForm.serialize();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: tweetData,
      success: () => {
        console.log("Post Success");
        loadTweets();
      }
    });
  });

});