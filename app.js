
(function(){
	'use strict';
	/*
		=========TO DO => 1.make cors() better, 2. make morgan switch from dev->prod
					3. setup morgan to skip some logging
	*/

	const express = require('express'),
			 http = require('http'),
			 bodyParser = require('body-parser'),
			 cors = require('cors'),
			 morgan = require('morgan'),
			 database_config = require('./serverConfigFiles/database_config.js'),
			 mysql = require('mysql2/promise'),//MUST BE /PROMISE
			 path = require('path');

	module.exports.create = function (port, publicDir, uploadsDir) {

		var app=express();
		var debug = require('debug')(app);
		app.options('*', cors());
		app.use(cors());
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(bodyParser.json());

		app.use(morgan('combined', {
			/*skip: function(req, res) { return res.statusCode < 400 },*/
		 stream: {
		 	write: function(message,encoding){
		 		loggly.log(message, ['BITREC-HTTP']);

		 	}
		 }
		}));
		const d_b = async ()=>(await mysql.createPool(database_config.prod_pool));
		const db = d_b();

		//var mobileApi = require('./mobile/mobileApi.js')(express,db);
		var loginApi = require('./serverRoutes/loginApi.js')(express,db);
		var jobseekerApi = require('./serverRoutes/jobseekerApi.js')(express,db);
		var adminApi = require('./serverRoutes/adminApi.js')(express,db);
		var clientApi = require('./serverRoutes/clientApi.js')(express,db);
		var workerApi = require('./serverRoutes/workerApi.js')(express,db);
		var campaignsApi = require('./serverRoutes/campaignsApi.js')(express,db);

		app.use(express.static(publicDir));
		app.use(express.static(uploadsDir));


		//ROUTES DEFINED
		//app.use('/resumeproapi',mobileApi);
		app.use('/login', loginApi);
		app.use('/jobseeker',jobseekerApi);
		app.use('/admin',adminApi);
		app.use('/worker',workerApi);
		app.use('/client',clientApi);
		app.use('/campaigns', campaignsApi);


		return app;
	};

}());
