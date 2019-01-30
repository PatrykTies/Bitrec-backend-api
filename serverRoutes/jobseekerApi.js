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
			 multerAzure = require('multer-azure'),
	   	 	 fs = require('fs'),
	   	 	 schemas = require('../schemas/schemas.js'),
	   	 	 auth_config = require('../serverConfigFiles/auth_config.js'),
		     Ajv = require('ajv'),
		     util = require('util'),
		     jwt = require('jsonwebtoken'),
				 _ = require('lodash'),
		     ajv = new Ajv();

		var log = require('../serverUtils/logger.js');
		var logger = log.child({SOURCE_FILE: 'jobseekerApi.js'});
		const loggly = require('../serverUtils/loggly.js');

		//const asyncMiddleware = require('../serverUtils/asyncMiddleware.js');

	 	 /*
			===== FILE UPLOAD MIDDLEWARE SERVICE USING multer
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


		var upload = multer({
		  storage: multerAzure({
		    connectionString: 'DefaultEndpointsProtocol=https;AccountName=teamsuppcv;AccountKey=YvSmv9+jPyDMiZTcfqaZeg8Rg8NkNfLeI62G9GQ3GAxvwd24SQt22OFUEBLQNCYGCI8ZUsNsZbCJBUH2XGmYjw==;EndpointSuffix=core.windows.net', //Connection String for azure storage account, this one is prefered if you specified, fallback to account and key if not.
		    account: 'teamsuppcv', //The name of the Azure storage account
		    key: 'YvSmv9+jPyDMiZTcfqaZeg8Rg8NkNfLeI62G9GQ3GAxvwd24SQt22OFUEBLQNCYGCI8ZUsNsZbCJBUH2XGmYjw==', //A key listed under Access keys in the storage account pane
		    container: 'cvs',  //Any container name, it will be created if it doesn't exist
		    blobPathResolver: function(req, file, cb){
					console.log('MULTER RUNNING!');
					crypto.pseudoRandomBytes(16, function (err, raw) {
						if(err){
							console.log('MULTER ERR ' + err);
						}
		      	cb(null, raw.toString('hex') +'.' + mime.extension(file.mimetype));
		      })
		    }
		  })
		})
		var upload_img = multer({
		  storage: multerAzure({
		    connectionString: 'DefaultEndpointsProtocol=https;AccountName=teamsuppcv;AccountKey=YvSmv9+jPyDMiZTcfqaZeg8Rg8NkNfLeI62G9GQ3GAxvwd24SQt22OFUEBLQNCYGCI8ZUsNsZbCJBUH2XGmYjw==;EndpointSuffix=core.windows.net', //Connection String for azure storage account, this one is prefered if you specified, fallback to account and key if not.
		    account: 'teamsuppcv', //The name of the Azure storage account
		    key: 'YvSmv9+jPyDMiZTcfqaZeg8Rg8NkNfLeI62G9GQ3GAxvwd24SQt22OFUEBLQNCYGCI8ZUsNsZbCJBUH2XGmYjw==', //A key listed under Access keys in the storage account pane
		    container: 'profileimg',  //Any container name, it will be created if it doesn't exist
		    blobPathResolver: function(req, file, cb){
					console.log('MULTER RUNNING!' + file.mimetype);
					crypto.pseudoRandomBytes(16, function (err, raw) {
						if(err){
							console.log('MULTER ERR ' + err);
						}
		      	cb(null, raw.toString('hex') +'.' + mime.extension(file.mimetype));
		      })
		    }
		  })
		})

		/*======================================================*/
     //api.post('/signup', upload.single('file'), function(req,res){ ///////////// upload.single('file')
    //USING MIDDLEWARE MULTER AS SECOND PARAM


		api.post('/signup', (req,res)=>{


			//var valid = ajv.validate(schemas.jobseeker, req.body);
			const valid = true;
			if(valid){
				jobseekerDao.createJobseeker(req.body)
				.then(jobseeker_id=>{
					console.log(require('util').inspect(jobseeker_id, { depth: null }));

					// var full_name = req.body.first_name +' '+ req.body.last_name;
					//
					// var request = emailSender.emailrequest(req.body.email_id,
					// 										jobseeker_id,
					// 										full_name);
				/*
					=====EMAIL SENDER =======
				*/
				// emailSender.send(request);

					//res.status(200).json({jobseeker_id:jobseeker_id})
					res.json({jobseeker_id:jobseeker_id})

				})
				.catch(err=>res.status(500).json('err' + err));


			}else{

				//console.log('jobseekerApi.js => Jobseeker data is INVALID! ' + util.inspect(ajv.errors));
				logger.error({err: ajv.errors});
				loggly.log({err: ajv.errors},['BITREC-SCHEMA-VALIDATION-FAILED']);
				res.status('500').json({"SCHEMA-VALIDATION-FAILED " : ajv.errors})
			}


		}),
		api.post('/upload-cv', upload.single('file'), (req,res)=>{

			//console.log(req.body.jobseeker_id)
			jobseekerDao.updateCVUrl(req.file.url, req.body.jobseeker_id).then(
				res.status(200).json('CV uploaded without errors')
			).catch(err=>{
				console.log('FILE UPLOAD WENT WRONG ' + err)
				res.status(500).json({'CV uploaded error' : err})
			})
		}),
		api.post('/upload-img', upload_img.single('img'), (req,res)=>{
			console.log(req.file.url);
			jobseekerDao.updateImgUrl(req.file.url, req.body.jobseeker_id).then(
				res.status(200).json('Image uploaded without errors')
			).catch(err=>console.log('IMAGE FILE UPLOAD WENT WRONG ' + err))

		}),


		api.get('/jobseekers-by-campaign', (req,res)=>{
			jobseekerDao.getNestedJobseekersPerCampaign()
			.then(rows=>res.status(200).json(rows))
			.catch(err=>res.status(500).json({"DB GET ERROR " : err}));
		}),

		api.put('/select', (req,res)=>{
		  const jobseeker_id = req.query.jobseeker_id;
			const email_id = req.query.email_id;
			const first_name = req.query.first_name;
			console.log(email_id + first_name);

			let request = emailSender.emailrequest("fxanomaly@gmail.com",
													100290,
													"Patryk");

			jobseekerDao.updateJobseekerJobStatus(req).then(response=>{
				//HERE WE SEND SENDGRID
				// var request = emailSender.emailrequest(email_id,
				//  										jobseeker_id,
				//  										first_name);

				/*
					=====EMAIL SENDER =======
				*/
					//emailSender.send(request)

					res.status(200).json({"JOBSEEKER_STATUS UPDATED TO SELECTED": "OK"})
				}
			).catch(
				err=>console.log('/select ERROR ' + err)
			)

		}),


		api.put('/addlogin-credentials', function(req,res){

			var valid = ajv.validate(schemas.jobseeker_password, req.body)

			if(valid){
				jobseekerDao.addJobseekerPassword(req.body)
						.then(
							response => res.status(200).json({"ADMIN INSERTED": "OK"})
						).catch(
							err => res.status(500).json({"DB INSERTION ERROR " : err})
					    )
			}else{
				logger.error({err: ajv.errors});
				loggly.log({err: ajv.errors},['BITREC-SCHEMA-VALIDATION-FAILED']);
  				res.status('500').json({"SCHEMA-VALIDATION-FAILED " : ajv.errors})
			}

		}),

		api.post('/login', (req,res) => {

			var valid = ajv.validate(schemas.jobseeker_password, req.body);

			if(valid){
				const enteredPassword = req.body.password
				const enteredEmail = req.body.email

				jobseekerDao.getPasswordfromDBviaEmail(enteredEmail)
							.then(
								idandpassword => {

								const savedPassword = idandpassword[0].password
								const jobseeker_id = idandpassword[0].jobseeker_id

								var validPassword = passwordUtil.comparePassword(enteredPassword, savedPassword)

								if(validPassword){
									loggly.log({success: 'JOBSEEKER LOGGED IN'},['BITREC-JOBSEEKER-LOGIN-OK']);
									var token = jwt.sign(jobseeker_id, auth_config.JWT_SECRET);
								    return res.json({token: token, id: jobseeker_id});
								}else{
									//console.log("PASSWORDS DON'T MATCH")
									logger.error({err: 'PASSWORD DID NOT MATCH'});
									loggly.log({err: 'PASSWORD DID NOT MATCH'},['BITREC-JOBSEEKER-LOGIN-FAILED']);
									return res.status(401).send()
								}

							}).catch(
								err => res.status(500).json({err: err})
							)
			}else{
				//console.log('looginApi.js => User data is INVALID!')
				logger.error({err: ajv.errors});
				loggly.log({err: ajv.errors},['BITREC-SCHEMA-VALIDATION-FAILED']);
  				res.status('500').json({"SCHEMA-VALIDATION-FAILED " : ajv.errors})
			}



		});
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
		//});
		/*
			============AUTH WALL=================
		*/



	   return api;
	};
}());
