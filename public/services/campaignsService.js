/*******************	THIS IS ANGULAR.JS RELATED   *****************************/
(function(){
	'use strict';
	angular.module('myapp')

	.service('campaignsService', ['$http','$q', function($http, $q){

		var deffered = $q.defer();

		$http.get('/api/campaigns').then(function(data){

			deffered.resolve(data);

		});

		this.getCampaigns = function(){

			return deffered.promise;
		};
		
		this.setCampaign = function(campaign){

			console.log('Service received campaign selected: ' + campaign);
			
			$http.post('/api/setcampaign', {campaign: campaign})	//here we must convert campaign string to JSON object		
			.success(function(data, status, headers){
				console.log(data);
			}).error(function(data, status, headers) {
				console.log( "failure message from Angular POST: " + JSON.stringify({data: data}));
			});		
		};

	}]);

	/*.factory('campaignsService', ['$http','$q', function($http, $q){ /*******************	THIS IS POSTING TO NODE.JS API DIRECTLY   *****************************
		
		var deffered = $q.defer();

		$http.get('/api/campaigns').then(function(data){

			deffered.resolve(data);

		});

		var campaignsFactory = {};

		campaignsFactory.getCampaigns = function(){

			return deffered.promise;		
			
		};

		return campaignsFactory;
	}]);*/
		
		

}());