define([

    'jquery',
    // 'jquery-ui-modules/widget'

], function($) {
    "use strict";
    
    $.widget('brm.smothScroll', {

        // Optional
        options: {
            smothScrollClass: '.smoth-scroll'
        },
        _create: function() {
            // Init code
            this._smothScroll(this.options.smothScrollClass);
        },
        _smothScroll: function (smothScrollClass) {
            var hash = null;
            var target = null;

            $(smothScrollClass).on('click', function(event) {

                // Make sure this.hash has a value before overriding default behavior
                if (this.hash !== "") {
                  // Prevent default anchor click behavior
                  event.preventDefault();

                  // Store hash
                  hash = this.hash;

                  // Using jQuery's animate() method to add smooth page scroll
                  $('html, body').animate({
                    scrollTop: target.offset().top - jQuery('.header-container').height()
                  }, 800, function(){

                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                  });
                }
              });

        }
    });
    return $.brm.smothScroll;
});