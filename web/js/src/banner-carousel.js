define([
    'jquery',
    'slick',
], function($) {
    "use strict";
    
    $.widget('brm.bannerCarousel', {

        // Optional

        options: {
            bannerClass: '.banner-carousel',
            arrowsMob: false,
            arrowsPad: false,
            arrowsDesk: true,
            dotsMob: true,
            dotsPad: true,
            dotsDesk: false,
        },
        _create: function() {
            // Init code
            
            this._slickProductCarousel(
                this.options.bannerClass,
                this.options.arrowsMob,
                this.options.arrowsPad,
                this.options.arrowsDesk,
                this.options.dotsMob,
                this.options.dotsPad,
                this.options.dotsDesk
                
            );
        },
        _bannerCarousel: function (
            bannerClass,
            arrowsMob,
            arrowsPad,
            arrowsDesk,
            dotsMob,
            dotsPad,
            dotsDesk
            ){
                $(bannerClass).slick({
                    slidesToShow: 1,
                    arrows: arrowsDesk,
                    dots: dotsDesk,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    centerMode: false,
                    focusOnSelect: true,
                    responsive: [
                        {
                            breakpoint: 960,
                            settings: {
                                arrows: arrowsMob,
                                dots: dotsMob
                            }
                        },
                        {
                            breakpoint: 720,
                            settings: {
                                arrows: arrowsPad,
                                dots: dotsPad
                            }
                        }
                    ]
                });
            },
    });
    return $.brm.bannerCarousel;
});