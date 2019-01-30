(function(){
  'use strict';

var app = angular.module('myapp', ['ui.router','ngAnimate','pascalprecht.translate']);

app.config(['$urlRouterProvider', '$stateProvider', '$translateProvider', function($urlRouterProvider, $stateProvider, $translateProvider) {
    $urlRouterProvider.otherwise('register');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'homeCtrl as home'
      })
      .state('hire', {
        url: '/hire',
        templateUrl: 'views/hire.html',
        controller: 'hireCtrl as hire'
      })
      .state('test', {
          
          url: '/test',
          templateUrl: 'views/test.html',
          
      })
      .state('test.many',{
              templateUrl:"views/test.many.html",
              controller: 'testCtrl'
              
      })
      .state('test.many2',{
              templateUrl:"views/test.many.html",
              controller: 'test2Ctrl'
              
      })
      .state('test.many3',{
              templateUrl:"views/test.many.html",
              controller: 'test3Ctrl'
            
      })
      .state('secured', {
        url: '/securedDetails',
        templateUrl: 'views/secured.html',
        controller: 'securedCtrl as secured'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'registerCtrl as register'
      });
    
      $translateProvider.useUrlLoader('api/translations');
      $translateProvider.preferredLanguage('en');
      //$translateProvider.fallbackLanguage('en');
    


      
}]);


}());

