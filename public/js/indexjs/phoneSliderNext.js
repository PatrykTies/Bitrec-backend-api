define(function(){
	
	function slide(item_width){

		var left_indent = parseInt($('.phone-inner ul').css('left')) - item_width,
		left_value = item_width * (-1);

		$('.phone-inner ul').animate({'left' : left_indent}, 200, function () {
			$('.phone-inner li:last').after($('.phone-inner li:first'));
			$('.phone-inner ul').css({'left' : left_value});
		});

		
	}

	return {
		slide: slide
	};

});