$(document).ready(function() {
  
  $('.tweet-text').on('input', function() {
    const characterCount = (140 - (this.value.length));

    const $parentSection = $(this).closest('.new-tweet');

    const $counter = $parentSection.find('.counter');

    if (characterCount < 0) {
      $counter.css('color', '#d80000');
      $counter.text(characterCount);
    }
    if (characterCount >= 0) {
      $counter.css('color', '#4056a1');
      $counter.text(characterCount);
    }
  });
});