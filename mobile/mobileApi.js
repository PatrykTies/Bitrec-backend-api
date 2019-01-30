(function(){

	'use srtrict';

	module.exports = function(app,express){
		var jobseekerDao = require('../serverServices/jobseekerDao.js'),
			 campaignDao = require('../serverServices/campaignDao.js'),
			 crypto = require('crypto'),
			 fs = require('fs'),
			 emailSender = require('../serverUtils/emailSender.js'),
			 api = express.Router();

		var log = require('../serverUtils/logger.js');
		var logger = log.child({SOURCE_FILE: 'mobileApi.js'});
		const loggly = require('../serverUtils/loggly.js');




		api.get('/company/1/pin/', (req,res) => {

			var pinGenerationDao = require('./mobileServices/pinGenerationDao.js');

			pinGenerationDao.generatePin().then(
					data => {
						res.send(data);
					}	
				).catch(
		       		 error => {
			     	 res.status(500).json({err:'SERVER ERROR: ' + error});
		    	});			
				
		});

		
		api.get('/campaigns', (req,res) =>{

			campaignDao.getAllCampaigns().then(
		    	rows => {
		    	 res.status(200).json(rows);
		    }).catch(
		        error => {   
			      res.status(500).json({err:'SERVER ERROR: ' + error});
		    });
						
		});

		api.get('/positions', (req,res) =>{

			campaignDao.getAllPositions().then(
		    	rows => {
		    	 res.status(200).json(rows);
		    }).catch(
		        error => {
			      
			      res.status(500).json({err:'SERVER ERROR: ' + error});
		    });
						
		});

		api.get('/companies', (req,res) => {
		    campaignDao.getRegisteredCompanies().then(
		    	rows => {
		    	 res.status(200).json(rows);
		    }).catch(
		        error => {   
			      res.status(500).json({err:'SERVER ERROR: ' + error});
		    });
		});

		api.get('/workforce/:jobseeker_id', (req,res) => {

			jobseekerDao.getNestedJobseeker(req.params.jobseeker_id).then(
				rows => {
		   		   res.status(200).json(rows);
		    }).catch(
		    	error => {	  
		    	  res.status(500).json({err:'SERVER ERROR: ' + error});
		    });

		});

		api.get('/applicants', (req,res) => {

			jobseekerDao.getNestedJobseekers().then(
				rows => {
		      		res.status(200).json({jobseekers: rows});
		    }).catch(
			   error => {    		
		     		res.status(500).json({err:'SERVER ERROR: ' + error});
		    });

		});
		
		/*
			IGNORE THAT FOR NOW
		*/
		api.get('/translations', function(req,res){

			var fs = require('fs'),
				JSONStream = require('JSONStream'),
				es = require('event-stream');
			
			var query = req.query.lang;
			
			var getStream = function(){
				var jsonData = 'translations.json',
					stream = fs.createReadStream(jsonData, {encoding:'utf8'}),
					parser = JSONStream.parse(['lang',true,query]);
					return stream.pipe(parser);
			};

			getStream().pipe(es.mapSync(function(data){
			
				res.json(data);
			}));

			
			/*
			if(query === 'pl'){
				res.json(
				   data.lang[0].pl
				);
			}*/
	
		});

		api.post('/savetoken', (req,res) => {

			var fcmTokensDao = require('./fcmTokensDao.js');
			fcmTokensDao.saveToken(req.body).then(
				response => {
		      		res.status(200).json({res:'TOKEN SAVED'});
		    }).catch(
			   error => {		
		     		res.status(500).json({err:'SERVER ERROR: ' + error});
		    });

		});


		return api;
	};
}());
