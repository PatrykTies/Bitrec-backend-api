(function(){
	'use strict';
	
angular.module('myapp').controller('hireCtrl', ['$scope',function($scope){

	  $scope.pageClass = 'page-hire';
	  $scope.filters = [[['tabs', 'contains', 'home']]];
      $scope.rankers = null;

      $scope.isDropdownOpen = {
        orderBy: false,
        filter: false
      };

      /**
       * Update the filters array based on the given filter
       * $param filter: the name of a tab like 'work'  
       */
      $scope.filter = function(filter){
        $scope.filters = [[['tabs', 'contains', filter]]];
      };

      $scope.isTabActive = function(tab){
        return $scope.filters && $scope.filters[0][0][2] === tab;
      };

      /**
       * Update the rankers array based on the given ranker
       * $param ranker: the name of a card's property or a custom function 
       */
      $scope.orderBy = function(ranker){
        $scope.rankers = [[ranker, "asc"]];
      };

      $scope.isRankerActive = function(ranker){
        return $scope.rankers && $scope.rankers[0][0] === ranker;
      };

     
      /**
       * The pile of cards to be added
       */
      var cardsToAdd =  [
        {
          id: 9,
          template : "../partials/work3.html",
          tabs : ["home", "work"],
          added : 1474871272105,
        },
        {
          id: 10,
          template : "../partials/work4.html",
          tabs : ["home", "work"],
          added : 1467871272105,
        },
        {
          id: 11,
          template : "../partials/education.html",
          tabs : ["home", "education"],
          data : {
            "degree" : "PhD",
            "field": "Artificial Intelligence",
            "school" : "MIT"
          },
          added : 1479871272105
        }
      ];

      /**
       * Add a card to the main view
       * Takes a card from the pile of cardsToAdd and prepend it to the list of 
       * cards. Take a card belonging to the selected tab
       */
      $scope.addCard = function(){
        var getCurrentTab = function(){
          return $scope.filters[0][0][2];
        };

        var getIndexOfNextCardInTab = function(tab){
          var index = -1;

          for(var i in cardsToAdd){
            if(cardsToAdd[i].tabs.indexOf(tab) !== -1){
              index = i;
              break;
            }
          }
          return index;
        };

        var index =  getIndexOfNextCardInTab(getCurrentTab());        

        if(index !== -1){
          $scope.cards.unshift(cardsToAdd[index]);
          cardsToAdd.splice(index, 1);
        }
      };

		$scope.cards = [
        {
          id: 1,
          template : "../partials/loader.html",
          tabs : ["home", "work"],
          data : {
            "position" : "Warehouse",
            "job" : "Manual Workforce"
          },
          added : 1444871272105,
        },
        {
          id: 2,
          template : "../partials/warehouse.html",
          tabs : ["home", "work"],
          data : {
            "position" : "Warehouse & Production",
            "job" : "Machinery Operators"
          },
          added : 1423871272105,
        },
        {
          id: 3,
           template : "../partials/drivers.html",
           tabs : ["home", "work"],
          data : {
            "position" : "Logistics",
            "job" : "HGV & Van Drivers"
          },
          added : 1413871272105,
        },
        {
          id: 4,
           template : "../partials/assembly.html",
           tabs : ["home", "work"],
          data : {
            "position" : "Production & Controll",
            "job" : "Assembly & Quality Controll Workforce"
          },
          added : 1403871272105,
        },
        {
          id: 5,
           template : "../partials/food.html",
           tabs : ["home", "work"],
          data : {
            "position" : "Food Production",
            "job" : "Food Manuafacturing Workforce"
          },
          added : 1453871272105,
        },
        {
          id: 6,
           template : "../partials/cleaning.html",
           tabs : ["home", "work"],
          data : {
            "position" : "Cleaning & Maintenance",
            "job" : "Cleaning & Maintenance Workforce"
          },
          added : 1423171272105,
        }
      ];

}]);

}());