define([
    'jquery'
], function ($) {
    "use strict";

    $.widget('brm.minicartGlobal', {
        // Optional
        options: {
            miniCart: '[data-block=\'minicart\']',
            wasActive: false
        },
        _create: function () {
            this._miniCartInit();
        },
        _miniCartInit:function(){
            // Init code
            var self = this,
                miniCart=$('[data-block=\'minicart\']');

            miniCart.on('dropdowndialogopen', function () {
                self._miniCartDropDownDialogOpend();
            });
            miniCart.on('click', '[data-action="close"]', function (event) {
                event.stopPropagation();
                self._closeMiniCart(miniCart);
            });
            $('#header-cart-over').on('click', function (event) {
                event.stopPropagation();
                self._closeMiniCart(miniCart);
            });

            miniCart.on('contentLoading', function () {
                self._miniCartContentLoaded(miniCart);
            });
        },
        _closeMiniCart: function (miniCart) {
            var scrollTop = parseInt($('html').css('top'), 10);

            miniCart.find('[data-role="dropdownDialog"]').dropdownDialog('close');
            // remove noscroll
            $('html').removeClass('noscroll').scrollTop(-scrollTop);
            $('#header-cart-over').removeClass('active');
            $('.showcart').removeClass('active');
            this.options.wasActive = false;
        },
        _miniCartContentUpdated: function (miniCart) {
            var self = this,
            scrollTop;

            if(miniCart.hasClass('active')){self.options.wasActive = true;}
            // if it wasn't active so it's add to cart => open the minicart and autoclose it.
            if(!self.options.wasActive){
                miniCart.find('[data-role="dropdownDialog"]').dropdownDialog("open");
                scrollTop = $('html').scrollTop() ? $('html').scrollTop() : $('body').scrollTop();

                $('html').addClass('noscroll').css('top',-scrollTop);
                $('#header-cart-over').addClass('active');
                $('.showcart').addClass('active');

                /** auto close the popup after 4 seconds */
                // if(!self.options.wasActive){
                //     setTimeout(function() {
                //         self._closeMiniCart(miniCart);
                //         self.options.wasActive = true;
                //     }, 4000);
                // }
            }
        },
        _miniCartContentLoaded: function (miniCart) {
            var self = this;

            miniCart.on('contentUpdated', function () {
                self._miniCartContentUpdated(miniCart);
            });
        },
        _miniCartDropDownDialogOpend: function () {
            // Open MinCart
            var scrollTop = $('html').scrollTop() ? $('html').scrollTop() : $('body').scrollTop();

            $('html').addClass('noscroll').css('top', -scrollTop);
            $('#header-cart-over').addClass('active');
            $('.showcart').addClass('active');
            $('.header-controls li.active .controls').trigger('click');
        },
    });
    return $.brm.minicartGlobal;
});