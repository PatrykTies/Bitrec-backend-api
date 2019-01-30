define(['app/app'], function(app){
    'use strict';

   /* app.config(['$controllerProvider', '$compileProvider', '$provide', '$filterProvider','$provide', '$animationProvider',
        function ($controllerProvider ,$compileProvider, $provide/*, $filterProvider, , $animationProvider) {
    // save references to the providers
        app.lazy = {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            service: $provide.service
            /*filter: $filterProvider.register,
            factory: $provide.factory,
            
            animation: $animationProvider.register
        };
    }]);*/

    app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', '$mdThemingProvider','uiGmapGoogleMapApiProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider, $mdThemingProvider, GoogleMapApiProviders) {

        $urlRouterProvider.otherwise('apply');
        $mdThemingProvider.theme('error-toast');
        //$locationProvider.html5Mode(true);
        $stateProvider
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'registerCtrl as register'
        })
        .state('apply', {

          url: '/apply',
          //controller: 'appCtrl',   
          views: {

              "master" : {
                   
                  templateUrl: '../../views/apply_forms/_masterView.html',
                  controller: 'applyCtrl'
                  
               },
                   "navbar@apply": {
                       templateUrl: '../../views/apply_forms/_navView.html',
                       
                   }, 

                   "progress@apply": {
                       templateUrl: '../../views/apply_forms/_progressView.html'
                   },  
                    "forms@apply": {
                       templateUrl: '../../views/apply_forms/_explanatory.html',
                       

                   }  
                }

          })  
               .state('apply.language',{
                  
                  parent: 'apply',
                  url: '/language',
                  views: {
                       /*'progress@apply': {
                        templateUrl: '../../views/apply_forms/_formOne.html',
                       
                       },*/
                      'forms@apply': {
                        templateUrl: '../../views/apply_forms/_langSelector.html',
                       
                       }
                  }
                })
               .state('apply.jobs',{
                  
                  parent: 'apply',
                  url: '/jobs',
                  views: {
                       /*'progress@apply': {
                        templateUrl: '../../views/apply_forms/_formOne.html',
                       
                       },*/
                      'forms@apply': {
                        templateUrl: '../../views/apply_forms/_campaigns.html',
                       
                       }
                  }
                })
              .state('apply.personalinfo',{
                  
                  parent: 'apply',
                  url: '/personalinfo',
                  views: {
                       /*'progress@apply': {
                        templateUrl: '../../views/apply_forms/_formOne.html',
                       
                       },*/
                      'forms@apply': {
                        templateUrl: '../../views/apply_forms/_personalinfo.html',
                       
                       }
                  }
                })
              .state('apply.yourlocation',{
                  
                  parent: 'apply',
                  url: '/yourlocation',
                  views: {
                       /*'progress@apply': {
                        templateUrl: '../../views/apply_forms/_formOne.html',
                       
                       },*/
                      'forms@apply': {
                        templateUrl: '../../views/apply_forms/_yourlocation.html',
                       
                       }
                  }
                })
               .state('apply.skills',{
                  
                  parent: 'apply',
                  url: '/skills',
                  views: {
                       /*'progress@apply': {
                        templateUrl: '../../views/apply_forms/_formOne.html',
                       
                       },*/
                      'forms@apply': {
                        templateUrl: '../../views/apply_forms/_skills.html',
                       
                       }
                  }
                })
                .state('apply.yourphoto',{
                  
                  parent: 'apply',
                  url: '/yourphoto',
                  views: {
                       /*'progress@apply': {
                        templateUrl: '../../views/apply_forms/_formOne.html',
                       
                       },*/
                      'forms@apply': {
                        templateUrl: '../../views/apply_forms/_yourphoto.html',
                       
                       }
                  }
                })
                .state('apply.ThankYouForRegisteringWithUs',{
                  
                  parent: 'apply',
                  url: '/ThankYouForRegisteringWithUs',
                  views: {
                       /*'progress@apply': {
                        templateUrl: '../../views/apply_forms/_formOne.html',
                       
                       },*/
                      'forms@apply': {
                        templateUrl: '../../views/apply_forms/_ThankYouForRegisteringWithUs.html',
                       
                       }
                  }
                })

        .state('view1',{
            url: '/view1',
            templateUrl: '/appTwo/partials/partial1.html',
            controller:'MyCtrl1',
            resolve: {
                  load: ["$q", function($q) { 
                    var deferred = $q.defer();
                    require(['facebook_package','facebookDir'], function() {
                           
                              deferred.resolve();


                       
                    });

                    return deferred.promise;
                  }],
            }
        })
        .state('view2',{
            url: '/view2',
            templateUrl: '/appTwo/partials/partial2.html',
            //controller: 'MyCtrl2'
        });


        GoogleMapApiProviders.configure({
          key:'AIzaSyDw2khZR6AvybWBzz9ljVdNdQMCG6J7Hw4',
          v:'3.25',
          libraries:'geometry,visualization,places'
        });



    }]);

});