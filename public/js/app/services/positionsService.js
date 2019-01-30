define(['app/app'], function(app){
	'use strict';
	

	app.service('positionsService', ['$http','$q', function($http, $q){

		

		this.getPositions = function(){

			var deffered = $q.defer();

			$http.get('/campaigns/positions').then(function(data){

				deffered.resolve(data);
				
			});

			return deffered.promise;
		};
		

	}]);

});