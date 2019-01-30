(function(){
	'use strict';

	var express = require('express');
	var cors = require('cors');
	var http = require('http');
	var bodyParser = require('body-parser');
	var morgan = require('morgan');
	const database_config = require('./serverConfigFiles/database_config.js');
	var mysql = require('mysql2/promise');//MUST BE /PROMISE
	var path = require('path');
	var loggly = require('./serverUtils/loggly');
		var app = express();
		var debug = require('debug')(app);
		app.options('*', cors());
		app.use(cors());

		app.use(morgan('dev'));//LOGGER
		//var accessLogStream = fs.createWriteStream(__dirname + '/morgan.log', {flags: 'a'})
		app.use(morgan('combined', {
			/*skip: function(req, res) { return res.statusCode < 400 },*/
		 stream: {
		 	write: function(message,encoding){
		 		loggly.log(message, ['BITREC-HTTP']);

		 	}
		 }
		}));
		app.set('port', process.env.PORT || 3000);
		app.use(express.static(path.join(__dirname, '/public')));
		//app.use(express.static(path.join(__dirname, '/dist')));
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(bodyParser.json());
		//========================TO DO =================
		//app.set('db', new mysqlGlobalDAO(db));



		//=====================DB INIT===================


		//will try with pool =>
		//https://stackoverflow.com/questions/41252627/npm-mysql2-too-many-connections-when-using-promises-and-a-connection-pool
		const d_b = async ()=>(await mysql.createPool(database_config.prod_pool));
		const db = d_b();

		//const db2={};
		//app.set('db',d_b());


		//=====================SERVER INIT===============

		db
			.then((db)=>{
					console.log('DB CONNECTED');
					//db2.db;
					app.listen(app.get('port'), function(err){
				    if(err){
				        console.log(err);
				    }else {
				        console.log('Express server listening on port ' + app.get('port'));
				    }
					});
		 		}
			)
			.catch(err=>console.log('DATABASE CONNECTION ERROR: ' + err));


		//var mobileApi = require('./mobile/mobileApi.js')(app, express);
		var loginApi = require('./serverRoutes/loginApi.js')(express,db);//add app
		var jobseekerApi = require('./serverRoutes/jobseekerApi.js')(express,db);
		var adminApi = require('./serverRoutes/adminApi.js')(express,db);
		var clientApi = require('./serverRoutes/clientApi.js')(express,db);
		var workerApi = require('./serverRoutes/workerApi.js')(express,db);
		var campaignsApi = require('./serverRoutes/campaignsApi.js')(express,db);



		//ROUTES DEFINED
		//app.use('/resumeproapi',mobileApi);
		app.use('/login', loginApi);
		app.use('/jobseeker',jobseekerApi);
		app.use('/admin',adminApi);
		app.use('/worker',workerApi);
		app.use('/client',clientApi);
		app.use('/campaigns', campaignsApi);



}());
