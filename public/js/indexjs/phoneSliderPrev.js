define(function(){
	
	function slide(item_width){

		var _phone = $('.phone-inner ul'),
			_left_indent = parseInt(_phone.css('left')) + item_width,
		    _left_value = item_width * (-1);
		
		$('.phone-inner ul').animate({'left' : _left_indent}, 200, function(){
			$('.phone-inner li:first').before($('.phone-inner li:last'));
			_phone.css({'left' : _left_value});
		});


	}

	return {
		slide: slide
	};

});