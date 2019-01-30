
/*******************	THIS IS ANGULAR.JS RELATED   *****************************/
define(['app/app'], function(app){

	"use strict";

	app.factory('jobseekerService', ['$http', function($http){ /*******************	THIS IS POSTING TO NODE.JS API DIRECTLY   *****************************/
		
		var jobseekerFactory = {};
		
		jobseekerFactory.signup = function(jobseeker){

			
			
			var fd = new FormData();
			for(var key in jobseeker){
				fd.append(key, jobseeker[key]);
			}
			

			$http.post('/jobseeker/signup', fd, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			}).then(function(response){
				console.log('JOBSEEKER SIGNED UP! ' + response)
			});
				
			
		};

		/*jobseekerFactory.campaign = function(jobseekerCampaign){

			
			
			//console.log('Service received campaign selected: ' + jobseekerCampaign); 
			
			$http.post('/api/setcampaign', {campaign: jobseekerCampaign})	 //THIS STRING NOW IS SAVED IN OBJECT 'campaign'
			.success(function(data, status, headers){
				console.log(data);
			}).error(function(data, status, headers) {
				console.log( "failure message from Angular POST: " + JSON.stringify({data: data}));
			});		
				
			
		};

		jobseekerFactory.position = function(jobseekerPosition){

			
			count++;
			console.log('Service received position selected: ' + jobseekerPosition); //11 - ok
			
			$http.post('/api/setposition', {position: jobseekerPosition})	 //THIS STRING NOW IS SAVED IN OBJECT 'campaign'
			.then(function(response){
				console.log(response);
			});

			console.log('COUNT = ' + count);
				
			
		};*/

		return jobseekerFactory;
	}]);

});



	


