(function(){
	'use strict';
	angular.module('myapp')
		.controller('securedCtrl', 
			['$scope','Jobseeker', 'multipartForm', '$translate','campaignsService', 'positionsService',
			function($scope, Jobseeker, multipartForm, $translate , campaignsService, positionsService){
		
		$scope.jobseeker = {};

		var secured = this;
		
		secured.step = 1;

		$scope.advance = function () {
		      secured.step++;
		};
		$scope.goback = function () {
			if(secured.step != 1) secured.step--; 
		};
		$scope.advance = function () {
		      secured.step++;
		};
		$scope.advanceLanguage = function (langKey) {

		    $translate.use(langKey);
		    secured.step++;
		 };



		
		$scope.$watch('jobseeker.campaign_id' , function(newValue, oldValue){

			if(newValue) {
				
				//campaignsService.setCampaign($scope.jobseeker.campaign_id.campaign_id);
				Jobseeker.campaign($scope.jobseeker.campaign_id.campaign_id);                   //THIS IS STRING SW001LO

				 //= newValue.campaign_id;
			}

			

		},true);

		$scope.$watch('jobseeker.position' , function(newValue, oldValue){

			if(newValue) {
				
				//campaignsService.setCampaign($scope.jobseeker.campaign_id.campaign_id);
				Jobseeker.position($scope.jobseeker.position.position_id);                   //THIS IS STRING SW001LO

				 //= newValue.campaign_id;
			}

			

		},true);


		
		

		secured.doSignup = function(){
			
			Jobseeker.signup($scope.jobseeker);  //THIS IS jobseekerService.js RELATED

				
		};
		

	
		$scope.campaigns = [];
		var promiseCampaigns = campaignsService.getCampaigns();
		promiseCampaigns.then(function(response){
			$scope.campaigns = response.data;
			//console.log($scope.campaigns);
		});
		$scope.positions = [];
		var promisePositions = positionsService.getPositions();
		promisePositions.then(function(response){
			$scope.positions = response.data;
			//console.log($scope.positions);
		});


	}]);

}());

