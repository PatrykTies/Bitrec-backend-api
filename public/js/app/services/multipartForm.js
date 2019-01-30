(function(){

	'use strict';
	
	angular.module('myapp')

	.service('multipartForm', ['$http', function($http){
		'use strict';
		
		this.post = function(uploadUrl, data){
			var fd = new FormData();
			for(var i in data){
				fd.append(i, data[i]);
			}
			$http.post(uploadUrl, fd, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			});
		};
	}]);






	


}());