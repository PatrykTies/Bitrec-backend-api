(function(){
	'use strict';

	
	angular.module('myapp')
		.directive('fileModel', ['$parse', function($parse){
	



	 	//var template = '<div class="col s4"></div>',

	 	var link = function(scope,element,attrs){
	 		
	 			var model = $parse(attrs.fileModel);
	 			var modelSetter = model.assign;

	 			element.bind('change', function(){

	 				scope.$apply(function(){
	 					modelSetter(scope, element[0].files[0]);
	 				});
	 			});

	 			
	 		};




			return {
				restrict: 'A',	
				link: link

				//template: template
			};
		

	}]);

	

}());