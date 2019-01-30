define(['app/app'], function(app){
	'use strict';

	
	
		app.directive('fileModel', ['$parse', function($parse){
	



	 	//var template = '<div class="col s4"></div>',

	 	var link = function(scope,element,attrs){
	 		
	 			var model = $parse(attrs.fileModel);
	 			var modelSetter = model.assign;

	 			element.bind('change', function(){

	 				scope.$apply(function(){
	 					modelSetter(scope, element[0].files[0]);
	 					console.log(element[0].files[0]);	
	 				});
	 			});

	 			
	 		};




			return {
				restrict: 'A',	
				link: link

				//template: template
			};
		

	}]);

	

});