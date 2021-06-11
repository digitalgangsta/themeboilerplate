define([
    'jquery',
    'Magento_Checkout/js/action/get-totals',
    'Magento_Customer/js/customer-data',
    'jquery-ui-modules/widget'
], function ($, getTotalsAction, customerData) {
    "use strict";

    $.widget('brm.cartGlobal', {
        // Optional
        options: {
            inputQtyClass: '.qty input'
        },
        _create: function () {
            // Init code
            var self = this;

            $(self.options.inputQtyClass).each(function (i, elem) {
                if ($(elem).parents('.form-cart').length) {
                    self._addButtonsToQtyInput(elem);
                }
            });
        },
        _addButtonsToQtyInput: function (element) {
            var self = this,
                label;

            if (!$(element).parent().hasClass('quantity-wrap')) {
                label = $(element).siblings('label');
                $(element).wrap('<div class="quantity-wrap"></div>')
                    .after('<a href="#" class="action increaseQty">' +
                        '<span class="qty-controler plus input-number-increment"></span>' +
                        '</a>')
                    .before('<a href="#" class="action decreaseQty">' +
                        '<span class="qty-controler minus input-number-decrement"></span>' +
                        '</a>');
                $(label).prependTo($(element).parent());
                $(element).siblings(".action.increaseQty").on('click', function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    self._increaseItemQty($(element));
                });

                $(element).siblings(".action.decreaseQty").on('click', function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    self._decreaseItemQty($(element));
                });
            }
        },

        /**
         * @param {HTMLElement} elem
         * @private
         */
        _increaseItemQty: function (elem) {
            var value = parseFloat($(elem).val());

            $(elem).val(value + 1).change();
            this._ajaxSubmit($('.form-cart'));
        },

        /**
         * @param {HTMLElement} elem
         * @private
         */
        _decreaseItemQty: function (elem) {
            var value = parseFloat($(elem).val());

            if (value > 1) {
                $(elem).val(value - 1).change();
                this._ajaxSubmit($('.form-cart'));
            }
        },
        _ajaxSubmit: function (form) {
            var self = this,
                url = $(form).attr('action'),
                parsedResponse,
                result,
                sections,
                deferred,
                err;

            $('.cart-loader').fadeIn();
            $.ajax({
                type: "POST",
                url: url,
                loader: true,
                data: $(form).serialize(), // serializes the form's elements.
                success: function (data) {
                    parsedResponse = $.parseHTML(data);
                    result = $(parsedResponse).find("#form-validate");
                    sections = ['cart'];

                    $("#form-validate").replaceWith(result);
                    // The mini cart reloading
                    customerData.reload(sections, true);
                    // The totals summary block reloading
                    deferred = $.Deferred();

                    getTotalsAction([], deferred);
                    $(self.options.inputQtyClass).each(function (i, elem) {
                        if ($(elem).parents('.form-cart').length) {
                            self._addButtonsToQtyInput(elem);
                        }
                    });
                    $('.cart-loader').fadeOut();
                },
                error: function (xhr, status, error) {
                    err = Function('"use strict";return (' + xhr.responseText + ')')();
                    console.log(err.Message);
                    console.log(status);
                    console.log(error);
                }
            });
        }
    });
    return $.brm.cartGlobal;
});