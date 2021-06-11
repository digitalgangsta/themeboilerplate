define([
    'jquery',
], function($) {
    "use strict";
    
    $.widget('brm.scrollToTop', {
        // Logicial code
        // Optional
        options: {
            scrollDivClass: '.scrollToTop'
        },
        _create: function() {
            // Init code
            this._scrollToTop(this.options.scrollDivClass);
        },
        _scrollToTop: function (scrollDivClass) {
            
            var lastScrollTop = 0;
            
            $(document).ready(function () {
                $(window).scroll(function () {
                    var st = $(this).scrollTop();

                    if ( st > lastScrollTop ) {
                        $(scrollDivClass).removeClass('active');
                    } else if(st > 200 ) {
                        $(scrollDivClass).addClass('active');
                    } else {
                        $(scrollDivClass).removeClass('active');
                    }
                    lastScrollTop = st;
                });

                $(scrollDivClass).on('click', function () {
                    $("html, body").animate({scrollTop: 0}, "slow");
                    return false;
                });
            });
        }
    });
    return $.brm.scrollToTop;
});