(function(){
	'use strict';

	 var form_select = function(){



	 	//var template = '<div class="col s4"></div>',

	 	var link = function(s,e,a){
	 			e.on('click', function(){
	 				e.html('You clicked me!')
	 				 .removeClass('button-hover')
	 				 .addClass('button-click')
	 				
	 				 //.css('background-color','red')

	 			})
	 			.on('mouseenter', function(){
	 				e.html('CLICK ME!!!')
	 				 .addClass('button-hover')
	 				
	 				 //.css('background-color','#2ab7a9')
	 			})
	 			.on('mouseleave', function(){
	 				e.html('EDUCATION')
	 				 .removeClass('button-hover')
	 				 .removeClass('button-click')
	 				
	 				 //.css('background-color','#2ab7a9')
	 			})
	 			
	 		}




			return {	
				link: link,
				//template: template
			}
		}



	angular.module('myapp').directive('formSelect', form_select)

}());