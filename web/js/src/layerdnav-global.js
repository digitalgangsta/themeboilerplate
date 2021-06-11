define(['jquery'], function($){
	"use strict";
	$.widget('brm.layerdnavGlobal',{
		_create:function() {
            $('.filter-title').click(function() {
                if ($(this).hasClass('back')) {
                    $('.filter-options-title, .filter-options-content').removeClass('active');
                    $(this).removeClass('back');
                } else {
                    $('.filter-content').toggleClass('opened').toggleClass('active_bar');
                    $(this).toggleClass('active');
                    $('body').toggleClass('filter-active');
                }
            });
            $('.filter-options-title').each(function() {
                var elem = $(this);
                
                elem.click(function() {
                    $(this).parent().children().not($(this)).not($(this).next()).removeClass('active');
                    $(this).toggleClass('active');
                    $(this).next().toggleClass('active');
                    $(this).parent().toggleClass('active');
                    $('.filter-title').addClass('back');
                    $('#layered-filter-block').addClass('active');
                    if ($('.main').has(elem).length > 0) {
                        if (elem.hasClass('active')) {
                            $('.page-wrapper').addClass('filter_hover');
                        } else {
                            $('.page-wrapper').removeClass('filter_hover');
                        }
                    }
                });
                $(document).mouseup(function(e) {
                    if (!elem.is(e.target) &&
                        elem.has(e.target).length === 0) {
                        elem.removeClass('active');
                        elem.next().removeClass('active');
                        elem.parent().removeClass('active');
                        $('#layered-filter-block').removeClass('active');
                        $('.page-wrapper').removeClass('filter_hover');
                    }
                });
            });
            $('.filter-options-content').each(function() {
                $(this).css('height', $(this).find('.items').height());
            });
		}
	});
	return $.brm.layerdnavGlobal;
});