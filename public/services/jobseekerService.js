
/*******************	THIS IS ANGULAR.JS RELATED   *****************************/
(function(){
	angular.module('myapp')

	.factory('Jobseeker', ['$http', function($http){ /*******************	THIS IS POSTING TO NODE.JS API DIRECTLY   *****************************/
		'use strict';
		var jobseekerFactory = {};

		jobseekerFactory.signup = function(jobseeker){

			/*return $http.post('/api/signup', jobseeker).success(function(data){
				console.log('POST from angular successful' + data);
				return data;
			});*/
			
			var fd = new FormData();
			for(var key in jobseeker){
				fd.append(key, jobseeker[key]);
			}
			
			$http.post('/api/signup', fd, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			});
				
			
		};

		jobseekerFactory.campaign = function(jobseekerCampaign){

			
			
			console.log('Service received campaign selected: ' + jobseekerCampaign); 
			
			$http.post('/api/setcampaign', {campaign: jobseekerCampaign})	 //THIS STRING NOW IS SAVED IN OBJECT 'campaign'
			.success(function(data, status, headers){
				console.log(data);
			}).error(function(data, status, headers) {
				console.log( "failure message from Angular POST: " + JSON.stringify({data: data}));
			});		
				
			
		};

		jobseekerFactory.position = function(jobseekerPosition){

			
			
			console.log('Service received position selected: ' + jobseekerPosition); 
			
			$http.post('/api/setposition', {position: jobseekerPosition})	 //THIS STRING NOW IS SAVED IN OBJECT 'campaign'
			.success(function(data, status, headers){
				console.log(data);
			}).error(function(data, status, headers) {
				console.log( "failure message from Angular POST: " + JSON.stringify({data: data}));
			});		
				
			
		};

		return jobseekerFactory;
	}]);






	


}());