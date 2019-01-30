define(['angular',
	'ngMaterial', 
	'ngMessages',
	'uiRouter',
	'ngBase64',
	'ngFileUpload',
	'ngImgCrop',
  'fileuploadShim',
  'uiGmapgoogle-maps'

	], function (ng) {
  
  var app = ng.module('app', 
  	[
  	'ui.router',
  	'ngMaterial',
  	'ngMessages',
  	'base64',
  	'ngFileUpload',
  	'ngImgCrop',
    'uiGmapgoogle-maps'
  	]);

   

  	return app;


});

