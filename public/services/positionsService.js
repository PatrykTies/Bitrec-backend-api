(function(){
	'use strict';
	angular.module('myapp')

	.service('positionsService', ['$http','$q', function($http, $q){

		var deffered = $q.defer();

		$http.get('/api/positions').then(function(data){

			deffered.resolve(data);

		});

		this.getPositions = function(){

			return deffered.promise;
		};
		
		this.setPosition = function(position){

			console.log('Service received position selected: ' + position);
			
			$http.post('/api/setposition', {position: position})	//here we must convert campaign string to JSON object		
			.success(function(data, status, headers){
				console.log(data);
			}).error(function(data, status, headers) {
				console.log( "failure message from Angular POST: " + JSON.stringify({data: data}));
			});		
		};

	}]);

}());