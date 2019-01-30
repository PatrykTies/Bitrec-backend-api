(function(){
	'use strict';

	angular.module('myapp')
		.directive('scroll', function($window){
			return {
				
				link: function(scope, element, attrs) {

					$.scrollify({
				          section : "section",
				          //sectionName : "#smartHRO",
				          easing: "easeOutExpo",
				          scrollSpeed: 1100,
				          offset : 0,
				          scrollbars: true,
				          before:function() {},
				          after:function() {},
				          afterResize:function() {}
				      });
/*
			        angular.element($window).bind("scroll", function() {
			          // if(this.pageYOffset >= 100 && this.pageYOffset <= 130)angular.element('body,html').stop().animate({scrollTop: $('#smartHRO').offset().top }, "slow");

			             	
			             
			           
			                 //angular.element('body,html').animate({scrollBy: (0,$('#smartHRO').offset().top) }, "slow");
			            
			            scope.scroll =this.pageYOffset;
			            scope.$apply();
			      	  });

			        	
			    	}*/
			}
		};
	});
}());