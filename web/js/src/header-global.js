define([
    'jquery'
],

function($) {
    'use strict';
	
	// Header controls
	$('.header-controls .controls').click(function() {
		$('.header-controls li').not($(this).parent('li')).removeClass('active');
	    $(this).parent('li').toggleClass('active');
	    $($(this).data('target')).toggleClass('active');    
	});


	// close the nav bar when clicking on the top empty area(white area)
	$('.nav-sections-item-title').on('click', function () { 
        $('.nav-toggle').click();
	}); 

});
                    