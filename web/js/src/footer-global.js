define([
    'jquery',
], function($) {
    "use strict";
    
    $.widget('brm.toggleFooterLinks', {

        // Optional

        options: {
            footerToggleClass: '.toggle-title'
        },
        _create: function() {
            // Init code
       
            this._toggleFooterLinks(this.options.footerToggleClass);
        },
        _toggleFooterLinks: function (footerToggleClass){
            
            if (window.matchMedia("(max-width: 960px)").matches) {  
                $(footerToggleClass).click(function() {
                    $(this).toggleClass('active');
                    $(this).next('.toggle-content').toggleClass('expand');
                });   
            }                 
            
        },
        _toggle: function (){
            var self = this;

            $(window).on('load resize', function () {
                  self._toggleFooterLinks();  
            });
        }


    });
    return $.brm.toggleFooterLinks;
});