$('document').ready(() => {

  // Toggle new tweet form
  $('.nav-new-tweet-container').on('click', () => {
    const $newTweet = $('.new-tweet');
    $newTweet.slideToggle(500, function() {
      if ($newTweet.is(':visible')) {
        $newTweet.find('textarea[name="text"]').focus();
      }
    });
  });

  // Scroll-up button
  $(document).ready(function() {
    const scrollThreshold = 250;
    const $scrollUpButton = $(".scroll-up-icon");
    let isVisible = false;
  
    $(document).on("scroll", function() {
      if ($(window).scrollTop() >= scrollThreshold && !isVisible) {
        $scrollUpButton.slideDown(300).css('display', 'flex');
        isVisible = true;
        $('.scroll-up-icon').on('click', function () {
          window.scrollTo(0,0);
          const $newTweet = $('.new-tweet');
          $newTweet.slideDown(500, function() {
            if ($newTweet.is(':visible')) {
              $newTweet.find('textarea[name="text"]').focus();
            }
          });
        });
      } else if ($(window).scrollTop() < scrollThreshold && isVisible) {
        $scrollUpButton.slideUp(300);
        isVisible = false;
      }
    });
  });

  // set #new-tweet-container variable global in order to empty before render
  const $displayTweetsContainer = $('#new-tweet-container');

  // Prevent cross-site scripting
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweet) => {
    const { name, avatars, handle } = tweet.user;
    const { text } = tweet.content;
    const date = timeago.format(tweet.created_at);

    return `
      <article class="display-tweets-container">
        <header>
          <div class="user-profile-header">
            <div>
              <img src="${avatars}" alt="ProfilePic">  
              <h2>${name}</h2>
            </div>
            <h2 class="user-handle">${handle}</h2>
          </div>
          <p class="display-tweet-text">
            ${escape(text)}
          </p>
        </header>
        <footer class="display-tweets-footer">
          <time>
            ${date}
          </time>
          <div class="footer-right">
            <div class="tweet-icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
            <div class="stats">
              <p>Likes: <span id="like-count">0</span></p>
              <p>Retweets: <span id="retweet-count">0</span></p>
            </div>
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
      return $('#length-error').slideDown(200).css('display', 'flex');
    } else {
      $('#length-error').slideUp(200);
    }
    
    if (!tweetText.trim()) {
      return $('#empty-error').slideDown(200).css('display', 'flex');
    } else {
      $('#empty-error').slideUp(200);
    }
    
    const tweetData = $tweetForm.serialize();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: tweetData,
      success: () => {
        console.log("Post Success");
        loadTweets();
        $('textarea[name="text"]').val('');
        $('.counter').text(140);
      },
      error: (error) => {
        window.alert('Error posting tweet 😓');
      }
    });
  });
});
