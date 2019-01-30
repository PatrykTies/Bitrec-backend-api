(function(){
	'use strict';

	var mobilenav = function(){
		return{
			    
				link: function(scope,el,attr){
					 $(".button-collapse").sideNav();
				     //TweenMax.from('ellipse', 2, {drawSVG:0});			
				}
			};
	};

	angular.module('myapp').directive('mobileNav', mobilenav);

}());