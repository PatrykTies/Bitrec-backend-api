requirejs.config({
    baseUrl: 'js/',//this path is for shim and paths
    paths: {
        jquery: //[
              //'//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min',
             '../bower_components/jquery/dist/jquery.min',
           //],
        
        //NOT AMD'fied - SHIMMED BELOW    
        angular:  '../bower_components/angular/angular.min',
        ngAnimate:  '../bower_components/angular-animate/angular-animate.min',
        uiRouter:  '../bower_components/angular-ui-router/release/angular-ui-router.min',
        ngAria :  '../bower_components/angular-aria/angular-aria.min',
        ngMaterial: //[
                //"//ajax.googleapis.com/ajax/libs/angular_material/1.1.0-rc2/angular-material.min",
                '../bower_components/angular-material/angular-material.min',
             //],
        
        ngMessages:  '../bower_components/angular-messages/angular-messages.min',
        ngTranslate:  '../bower_components/angular-translate/angular-translate.min',
        ngBase64: '../bower_components/angular-base64/angular-base64.min',
        ngFileUpload: '../bower_components/ng-file-upload/ng-file-upload-all.min',
        fileuploadShim: '../bower_components/ng-file-upload/ng-file-upload-shim.min',
        ngImgCrop:'../bower_components/ng-img-crop/compile/minified/ng-img-crop',
        lodash:'../bower_components/lodash/dist/lodash.min',
        logger:'../bower_components/angular-simple-logger/dist/angular-simple-logger.min',
        'uiGmapgoogle-maps':'../bower_components/angular-google-maps/dist/angular-google-maps.min',

        

 



        //AMD'fied from origin
        fullPage: '../bower_components/fullPage.min',
        d3: '../bower_components/d3/d3.min',
        TweenMax: '../bower_components/TweenMax.min',

        scrollingModule: 'indexjs/pageScrollingModule',
        chartingd3: 'indexjs/chartingd3',
        smartHRO: 'indexjs/smartHRO',
   
    },

    shim: {
        'jquery': {
            exports: '$'
        },
        'angular':{
            deps:['jquery'],
            exports: 'angular'
        },
        'ngAnimate': {
            deps: ['angular']
        },
        'uiRouter':{
            deps:['angular']

        },
        'ngAria':{
            deps:['angular']
        },
        'ngMessages':{
            deps:['angular']
        },
        'ngTranslate': {
            deps: ['angular']
        },

        'ngMaterial': {
           deps:['ngAnimate','ngAria']
        },
        'ngBase64':{
            deps:['angular']
        },
        'ngFileUpload':{
            deps:['angular']
        },
        'fileuploadShim':{
            deps:['angular']
        },
        'ngImgCrop':{
            deps:['angular']
        },
        'logger':{
            deps:['angular']
        },
        'uiGmapgoogle-maps':{
            deps:['lodash', 'logger'],
            exports: 'uiGmapgoogle-maps'
        }
        
      
        
    },
    
});



