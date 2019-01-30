(function(){
	'use strict'

	module.exports = function(express,db){
		var api = express.Router(),
		  jobseekerDAO = require('../serverServices/jobseekerDao.js'),
	    jobseekerDao = jobseekerDAO(db),
			emailSender = require('../serverUtils/emailSender.js'),
			passwordUtil = require('../serverUtils/passwordUtil.js');

		const crypto = require('crypto'),
			 mime = require('mime'),
			 multer = require('multer'),
	   	 	 fs = require('fs'),
	   	 	 schemas = require('../schemas/schemas.js'),
	   	 	 auth_config = require('../serverConfigFiles/auth_config.js'),
		     Ajv = require('ajv'),
		     util = require('util'),
		     jwt = require('jsonwebtoken'),
		     ajv = new Ajv();

		var log = require('../serverUtils/logger.js');
		var logger = log.child({SOURCE_FILE: 'jobseekerApi.js'});
		const loggly = require('../serverUtils/loggly.js');



	 	 /*
			===== FILE UPLOAD SERVICE USING multer
	 	 */
		// var storage = multer.diskStorage({
		//   destination: function (req, file, cb) {
		//     cb(null, './uploads/cv');
		//   },
		//   filename: function (req, file, cb) {
		//     crypto.pseudoRandomBytes(16, function (err, raw) {
		//       cb(null, raw.toString('hex') +'.' + mime.extension(file.mimetype));
		//     });
		//   }
		// });
		//
		// var upload = multer({ storage: storage });

		/*======================================================*/

		//
		// api.post('/personal-data', upload.single('file'), function(req,res){
		// 	var resumeurl = '';
		//
		//
		// 	//console.log(typeof req.body.age); === WRONG, MUST BE INTEGER, NOT STRING
		// 	req.body.age = parseInt(req.body.age, 10);
		// 	req.body.employement_status = parseInt(req.body.employement_status, 10);
		// 	req.body.when_to_start_work = parseInt(req.body.when_to_start_work, 10);
		// 	req.body.worked_before = parseInt(req.body.worked_before, 10);
		// 	req.body.english_level = parseInt(req.body.english_level, 10);
		// 	req.body.position_id = parseInt(req.body.position_id, 10);
		// 	req.body.company_id = parseInt(req.body.company_id, 10);
		//
		//
		//
		// 	var valid = ajv.validate(schemas.jobseeker, req.body);
		// 	if(valid){
		//
		// 		if(req.file){
		// 			resumeurl = req.file.path;
		// 			//console.log('RECEIVED FILE' + resumeurl);
		// 		}else resumeurl = 'no file was uploaded';
		//
		//
		// 		jobseekerDao.createJobseeker(req.body, resumeurl)
		// 					.then(
		// 						response=>{
		//
		// 					    var jobseeker_id = response;
		// 						var full_name = req.body.first_name +' '+ req.body.last_name;
		//
		// 						var request = emailSender.emailrequest(req.body.email_id,
		// 																jobseeker_id,
		// 																full_name);
		// 						/*
		// 							=====EMAIL SENDER =======
		// 						*/
		// 						emailSender.send(request);
		//
		// 						res.status(200).json('New Jobseeker Applied!');
		//
		// 					}).catch(
		// 						err=>{
		// 							res.status(500).json({err: err});
		// 						}
		// 					);
		// 	}else{
		//
		// 		//console.log('jobseekerApi.js => Jobseeker data is INVALID! ' + util.inspect(ajv.errors));
		// 		logger.error({err: ajv.errors});
		// 		loggly.log({err: ajv.errors},['BITREC-SCHEMA-VALIDATION-FAILED']);
  	// 			res.status('500').json({"SCHEMA-VALIDATION-FAILED " : ajv.errors})
		// 	}
		//
		// }),

		api.get('/personal/:jobseeker_id', (req,res) => {
			//'/workforce/filter?bycampaigns' if(req.query)
			jobseekerDao.getNestedWorker(req.params.jobseeker_id).then(
				rows => {
		   		   return res.status('200').json(rows);
		    }).catch(
		    	error => {
		     	  console.log(error);
		    	  return res.status('500').json('SERVER ERROR: ' + error);
		    });

		}),


		api.put('/addlogin-credentials', (req,res)=>{

			//console.log(req.body);

			var valid = true;//ajv.validate(schemas.jobseeker_password, req.body)

			if(valid){
				jobseekerDao.addJobseekerPassword(req.body)
				.then(jobseeker_id=>{
					//console.log(jobseeker_id);
					  var token = jwt.sign(jobseeker_id, auth_config.JWT_SECRET);
						//console.log('token: '+ token + ' id: '+ jobseeker_id);
					  res.status(200).json({token: token, id: jobseeker_id});
					}
				)
				.catch(err=>{
					console.log('FROM API:' + err)
					res.status('500').json({"WORKER LOGIN CREDENTIALS INSERTED FAILED": err})
				})

			}else{
				logger.error({err: ajv.errors});
				loggly.log({err: ajv.errors},['BITREC-SCHEMA-VALIDATION-FAILED']);
  				res.status('500').json({"SCHEMA-VALIDATION-FAILED " : ajv.errors})
			}

		}),
		api.post('/login', async (req,res) => {

			const enteredPassword = req.body.password
			const enteredEmail = req.body.email

	    const [[{jobseeker_id,password}]] = await jobseekerDao.getPasswordfromDBviaEmail(enteredEmail);

			var validPassword = passwordUtil.comparePassword(enteredPassword, password);

			if(validPassword){
				loggly.log({success: 'JOBSEEKER LOGGED IN'},['BITREC-JOBSEEKER-LOGIN-OK']);
				var token = jwt.sign(jobseeker_id, auth_config.JWT_SECRET);
			  res.status(200).json({token: token, id: jobseeker_id});
			}else{
				//console.log("PASSWORDS DON'T MATCH")
				logger.error({err: 'PASSWORD DID NOT MATCH'});
				loggly.log({err: 'PASSWORD DID NOT MATCH'},['BITREC-JOBSEEKER-LOGIN-FAILED']);
				res.status(401).send({'AUTH_ERROR':'SOMETHING WENT WRONG, RE-ENTER CRE'})
			}

		}),

		api.post('/authcheck', (req,res,next) => {

			const token = req.body.token;

			jwt.verify(token, auth_config.JWT_SECRET, function(err,decoded){
				if(err){
					logger.error({err: 'UNAUTHORIZED ATTEMPT'});
					loggly.log({err: 'UNAUTHORIZED ATTEMPT'},['BITREC-HACK-ATTEMPT']);
					return res.status(401).json({
						title: 'Not Authorized Access',
						error: err
					});
				}
				//console.log('ADMIN AUTHORIZED');
				return res.status(200).send();
				next();
			});
		}),
		api.put('/add-address/:jobseeker_id', (req,res)=>{
			//var valid = ajv.validate(schemas.jobseeker_password, req.body)

			// if(valid){
			jobseekerDao.addAddressDetails(req)
					.then(
						response => res.status(200).json({"ADDRESS DETAILS INSERTED": "OK"})
					).catch(
						err => res.status(500).json({"DB INSERTION ERROR " : err})
				  )
		}),

		api.put('/add-personaltaxdata/:jobseeker_id', (req,res)=>{
			jobseekerDao.addPersonalTaxData(req)
					.then(
						response => res.status(200).json({"PERSONAL&TAX DETAILS INSERTED": "OK"})
					).catch(
						err => res.status(500).json({"DB INSERTION ERROR " : err})
				  )
		}),

		api.put('/add-bankdetails/:jobseeker_id', (req,res)=>{
			jobseekerDao.addBankDetails(req)
					.then(
						response => res.status(200).json({"BANK DETAILS INSERTED": "OK"})
					).catch(
						err => res.status(500).json({"DB INSERTION ERROR " : err})
				  )
		});



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
		// 	jwt.verify(token, auth_config.JWT_SECRET, function(err,decoded){
		// 		if(err){
		// 			logger.error({err: 'UNAUTHORIZED ATTEMPT'});
		// 			loggly.log({err: 'UNAUTHORIZED ATTEMPT'},['BITREC-HACK-ATTEMPT']);
		// 			return res.status(401).json({
		// 				title: 'Not Authorized Access',
		// 				error: err
		// 			});
		// 		}
		// 		console.log('JOBSEEKER AUTHORIZED');
		// 		next();//This jumps down if authorized
		// 	});
		// });
		/*
			============AUTH WALL=================
		*/



	   return api;
	};
}());
