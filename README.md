# cat-clicker

This is my Udacity Cat Clicker that I am creating.  All he cat pictures are my cats or cats that I know (or knew).



In case you need a refresher on events and event listeners, here are some links.

If you're writing Cat Clicker with vanilla JS (no jQuery), you'll be adding the "click" event with elem.addEventListener().

https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener

var elem = document.getElementById('my-elem');
elem.addEventListener('click', function(){
  //the element has been clicked... do stuff here
}, false);

If you're using jQuery, you'll be adding the "click" event listener with jQuery.click(). http://api.jquery.com/click/

$('#my-elem').click(function(e) {
  //the element has been clicked... do stuff here
});
