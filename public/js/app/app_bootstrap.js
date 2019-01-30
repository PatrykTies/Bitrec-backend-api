
//THIS MODULE PATH IS RELATIVE TO ITS CALLING MASTER
define([
  'angular',
  'app/app',
  'app/router',
  'app/controllers/applyCtrl',
  'app/directives/fileModel'
  ],function (
    ng, 
    app) {
  
  	app.run(
    ['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ]);

  
    require(['domReady!'], function (document) {
		  		 
        ng.bootstrap(document, ['app']);

        var preloader = document.getElementById('preloader');
        preloader.style.display = 'none';
    });


	  

});