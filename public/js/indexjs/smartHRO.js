define(['jquery','indexjs/phoneSliderPrev', 'indexjs/phoneSliderNext'], function($, slidePrev, slideNext){
	
		function phoneSlider(){
			var item_width = $('.phone-inner li').outerWidth(),
			left_value = item_width * (-1),
			prev = $('.fp-prev'),
			next = $('.fp-next');

			//THOSE AUTOMATICALY SWITCH 1 VIEW FORWARD
			//$('.phone-inner li:first').before($('.phone-inner li:last'));
			//$('.phone-inner ul').css({'left' : left_value});

			

			prev.click(function(){slidePrev.slide(item_width);});
			
			next.click(function(){slideNext.slide(item_width);});			
		}

		$(document).ready(phoneSlider);
});

		
