
//COMPILE WITH COMMAND :   node tools/r.js -o tools/build.js

{
	//baseUrl: './public/appTwo',
	appDir: '../public', //GO ONE DIR UP
	dir:'../dist', //GO ONE UP AND CREATE dist
	mainConfigFile: '../public/js/commonPackage.js', //GO ONE UP AND FIND main.js, starting from tools folder
	//name: './public/appTwo/main',
	//preserveLicenseComments: false,
	//paths:{
		//facebook_module : 'empty:',
		//requireLib: '../appTwo/lib/require'
	//}
	modules: [
        //First set up the common build layer.
        {
            //module names are relative to baseUrl
            name: 'commonPackage',
           
            include: [
                      'jquery' 

            ]
        },
        {
            //module names are relative to baseUrl
            name: 'indexPackage',
            //List common dependencies here. Only need to list
            //top level dependencies, "include" will find
            //nested dependencies.
            include: [

                      'indexPackage',
                      'fullPage',
                      'TweenMax',

                      'chartingd3',
                      'smartHRO',
                      './indexjs/servicesPage',
                      'scrollingModule'
                      
                     
            ],
            exclude: ['commonPackage']
        },
        {
            //module names are relative to baseUrl
            name: 'angularPackage',
            //List common dependencies here. Only need to list
            //top level dependencies, "include" will find
            //nested dependencies.
            //YOU MUST WRITE DOWN EVERYTHING IN 'include:[{}]': SO IT BECOMES 1 FILE
            include: [
                      'angular',
                      'ngAnimate',
                      'uiRouter',
                      'ngMaterial',
                      'ngMessages',
                      'ngTranslate',

                      'angularPackage',
                      
                      './app/app_bootstrap',
                      './app/app',
                      './app/router',

                      './app/controllers/applyCtrl',

                      './app/services/jobseekerService',
                      './app/services/campaignsService',
                      './app/services/positionsService',

                      './app/directives/fileModel',


                      'domReady'
                   

                ],
            exclude: ['commonPackage']
        }

       


    ]

	
}