(function(){


	'use strict'

	module.exports = function(express,db){
		var api = express.Router(),
		 jobseekerDAO = require('../serverServices/jobseekerDao.js'),
		 jobseekerDao = jobseekerDAO(db),
		 campaignDAO = require('../serverServices/campaignDao.js'),
		 campaignDao = campaignDAO(db),
		 adminDao = require('../serverServices/adminDao.js'),
		 jobSectorsDAO = require('../serverServices/job_sectorsDAO.js'),
		 jobSectorsDao = jobSectorsDAO(db);

		const auth_config = require('../serverConfigFiles/auth_config.js'),
			 dbConnection = require('../dbConnection.js'),
		     bluePromise = require("bluebird"),
		     Admin = require('../dataModels/adminModel.js'),
			 jwt = require('jsonwebtoken');

		/*
			============DEVELOPMENT ZONE, NOT GUARDED, AFTER WORK, MOVE IT DOWN=================
		*/




		/*
			============AUTH WALL=================
		*/
		// api.use('/', (req,res,next) => {//https://WWW,..../admin/
		// 	const authorizationHeader = req.headers['authorization'];
		//
		// 	let token;
		//
		// 	if(authorizationHeader){
		// 		token = authorizationHeader.split(' ')[1];
		// 	}else{
		// 		return res.status(401).json({error: 'No token provided with this request!'});
		// 	}
		//
		// 	jwt.verify(token, auth_config.JWT_SECRET_ADMIN, function(err,decoded){
		// 		if(err){
		// 			return res.status(401).json({
		// 				title: 'Not Authorized Access',
		// 				error: err
		// 			});
		// 		}
		// 		console.log('ADMIN AUTHORIZED');
		// 		next();//This jumps down if authorized
		// 	});
		// });
		/*
			============AUTH WALL=================
		*/
		api.get('/get-nested-job-sectors', async (req,res) => {
		    const rows = await jobSectorsDao.getNestedJobSectors();
				res.status(200).json(rows);
		});

		api.get('/companies', async (req,res) => {
			const rows = await campaignDao.getRegisteredCompanies();
			res.status(200).json(rows);

		});

		api.get('/applicants', (req,res) => {


			jobseekerDao.getNestedJobseekers().then(
				rows => {
		      		return res.status('200').json(rows);
		    }).catch(
			   error => {
		     		console.log(error);
		     		return res.status('500').json('SERVER ERROR: ' + error);
		    });

		});

		api.get('/workforce/all', async (req,res) => {
			const rows = await jobseekerDao.getNestedWorkers();
			res.status(200).json(rows);
		});

		api.get('/workforce/:jobseeker_id', (req,res) => {
			//'/workforce/filter?bycampaigns' if(req.query)
			jobseekerDao.getNestedJobseeker(req.params.jobseeker_id).then(
				rows => {
		   		   return res.status('200').json(rows);
		    }).catch(
		    	error => {
		     	  console.log(error);
		    	  return res.status('500').json('SERVER ERROR: ' + error);
		    });

		});

		



	   return api;
	};
}());
