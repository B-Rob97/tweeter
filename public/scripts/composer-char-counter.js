$(document).ready(function() {
  
  $('#tweet-text').on('input', function() {
    const characterCount = (140 - (this.value.length));
    console.log(characterCount);
  });


});


