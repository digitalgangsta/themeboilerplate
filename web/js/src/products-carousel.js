define([
    'jquery',
    'slick',
], function($) {
    "use strict";
    
    $.widget('brm.slickProductsCarousel', {

        // Optional

        options: {
            crousleClass: '.products-carousel',
            slidesToShowMob: 2,
            slidesToShowPad: 3,
            slidesToShowDesk: 4,
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
                this.options.crousleClass,
                this.options.slidesToShowMob,
                this.options.slidesToShowPad,
                this.options.slidesToShowDesk,
                this.options.arrowsMob,
                this.options.arrowsPad,
                this.options.arrowsDesk,
                this.options.dotsMob,
                this.options.dotsPad,
                this.options.dotsDesk
                
            );
        },
        _slickProductCarousel: function (
            crousleClass,
            slidesToShowMob,
            slidesToShowPad,
            slidesToShowDesk,
            arrowsMob,
            arrowsPad,
            arrowsDesk,
            dotsMob,
            dotsPad,
            dotsDesk
            ){
                $(crousleClass).slick({
                    slidesToShow: slidesToShowDesk,
                    arrows: arrowsDesk,
                    dots: dotsDesk,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: false,
                    centerMode: false,
                    focusOnSelect: true,
                    responsive: [
                        {
                            breakpoint: 960,
                            settings: {
                                slidesToShow: slidesToShowPad,
                                arrows: arrowsMob,
                                dots: dotsMob,
                            }
                        },
                        {
                            breakpoint: 720,
                            settings: {
                                slidesToShow: slidesToShowMob,
                                arrows: arrowsPad,
                                dots: dotsPad,
                            }
                        }
                    ]
                });
            },
    });
    return $.brm.slickProductsCarousel;
});