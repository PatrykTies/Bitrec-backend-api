
(function(){
	'use strict';
	angular.module('myapp')	
		.directive('scrollToItem', function() {                                                      
		    return {                                                                                 
		        restrict: 'A',                                                                       
		        scope: {                                                                             
		            scrollTo: "@"                                                                    
		        },                                                                                   
		        link: function(scope, element, attr) {                                                   

		            element.on('click', function() {                                                    
		                angular.element('body,html').animate({scrollTop: $(scope.scrollTo).offset().top }, "slow");
		            });

		            //IF THERE IS 30PIX SCROLL MINUS (UP) FROM CURRENT Y OFFSET POSITION THAN SCROLL TO PREV ID

		            //IF THERE IS 30PIX SCROLL PLUS TO BOTTOM POSITION (OFFSET Y TOP + WINDOW.SCREENSIZE) THAN SCROLL DOWN TO NEXT ID

		            //EACH TIME WE LAND IN ID WE SAVE AND OVERRIDE VARIABLES FOR SCROLLING TRIGGERS
		                                                            
		        } 


		    };
	    });    
				
			
	
		    

}()); 