(function(){

	angular.module('myapp').controller('stepCtrl', ['$scope', function($scope){
		'use strict';

		$scope.step = 1;

		$scope.advance = function () {
		      $scope.step++;
		};
		$scope.goback = function () {
			if($scope.step != 1) $scope.step--; 
		};
		

	}]);
			
}());