define([

    'jquery',
    // 'jquery-ui-modules/widget'

], function($) {
    "use strict";

    $.widget('brm.qtyControlButtons', {
        // Optional
        options: {
            inputQtyClass: '.qty input',
            miniCarturlUpdate: window.checkout.updateItemQtyUrl
        },
        _create: function() {
            // Init code
            var self = this,
                miniCart = $('[data-block=\'minicart\']');

            $(self.options.inputQtyClass).each(function(i, elem) {
                if (!$(elem).parents('.form-cart').length) {
                    self._addButtonsToQtyInput(elem);
                }
            });
            this._addButtonsToQtyInput();
            miniCart.on('dropdowndialogopen', function () {
                self._miniCartContentLoaded(miniCart);
            });
        },
        _addButtonsToQtyInput: function (element) {
            var self = this;

            if (!$(element).parent().hasClass('quantity-wrap')) {

                $(element).wrap('<div class="quantity-wrap"></div>')
                    .after('<button class="action increaseQty">'+
                        '<span class="qty-controler plus input-number-increment"></span>'+
                        '</button>')
                    .before('<button class="action decreaseQty">'+
                        '<span class="qty-controler minus input-number-decrement"></span>'+
                        '</button>');


                $(element).siblings(".action.increaseQty").on('click', function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    if ($(element).parents('.minicart-wrapper').length){
                        self._increaseItemQty($(element));
                    }else{
                        self._increaseQty($(element));
                    }
                });

                $(element).siblings(".action.decreaseQty").on('click', function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    if ($(element).parents('.minicart-wrapper').length){
                        self._decreaseItemQty($(element));
                    }else{
                        self._decreaseQty($(element));
                    }
                });
            }
        },
        _miniCartContentLoaded: function (miniCart) {
            var self = this;

            miniCart.on('contentUpdated', function () {
                miniCart.find(self.options.inputQtyClass).each(function(i, elem) {
                    self._addButtonsToQtyInput(elem);
                });
            });
        },
        _increaseQty: function (elem){
            var value=parseFloat($(elem).val());

            elem.val(value+1).change();
        },
        _decreaseQty: function (elem){
            var value=parseFloat($(elem).val());

            if (value > 1){
                elem.val(value-1).change();
            }
        },

        /**
         * @param {HTMLElement} elem
         * @private
         */
        _increaseItemQty: function (elem) {
            var itemId = elem.data('cart-item'),
            updateElem=$('#update-cart-item-'+itemId),
            value=parseFloat($('#cart-item-' + itemId + '-qty').val());

            $('#cart-item-' + itemId + '-qty').val(value+1).change();
            updateElem.click();
        },

        /**
         * @param {HTMLElement} elem
         * @private
         */
        _decreaseItemQty: function (elem) {
            var itemId = elem.data('cart-item'),
            updateElem=$('#update-cart-item-'+itemId),
            value=parseFloat($('#cart-item-' + itemId + '-qty').val());

            if (value > 1){
                $('#cart-item-' + itemId + '-qty').val(value-1).change();
                updateElem.click();
            }

        }
    });
    return $.brm.qtyControlButtons;
});