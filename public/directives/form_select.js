(function(){
	'use strict';

	 form_select.$inject = ['$timeout'];
	 function form_select($timeout){


	 	var link = function(s,element,a,ngModel){
	 			$timeout(create);

	 			if(ngModel){
	 				ngModel.$render = create;
	 			}
				
	 			function create(){

	 				element.material_select();
	 			}
	 			
	 			element.one('$destroy', function(){

	 				element.material_select('$destroy');
	 			});
	 			
	 			
	 			
	 		};




			return {	
				link: link,
				
				require: '?ngModel'
			};
	}



	angular.module('myapp').directive('formSelect', form_select);

}());