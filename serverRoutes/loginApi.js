(function(){

	'use strict'

	module.exports = function(express,db){


		var api = express.Router(),
		    adminDao = require('../serverServices/adminDao.js'),
		    passwordUtil = require('../serverUtils/passwordUtil.js');

		const schemas = require('../schemas/schemas.js'),
		      Ajv = require('ajv'),
		      ajv = new Ajv(),
		      auth_config = require('../serverConfigFiles/auth_config.js'),
		      jwt = require('jsonwebtoken');

        var log = require('../serverUtils/logger.js');
		var logger = log.child({SOURCE_FILE: 'loginApi.js'});
		const loggly = require('../serverUtils/loggly.js');


		api.post('/add_admin', (req,res) => {
			//FIRST VALIDATE req.body FROM CLIENT, AGAINST CORRUPT DATA
			var valid = ajv.validate(schemas.admin, req.body)

			if(valid){
				adminDao.adminAddEmailPassword(req.body)
						.then(
							response => res.status('200').json({"ADMIN INSERTED": "OK"})
						).catch(
							err => res.status('500').json({"DB INSERTION ERROR " : err})
					    )
			}else{
				logger.error({err: ajv.errors});
				loggly.log({err: ajv.errors},['BITREC-SCHEMA-VALIDATION-FAILED']);
  				res.status('500').json({"SCHEMA-VALIDATION-FAILED " : ajv.errors})
			}

		})

		api.post('/admin_login', (req,res) => {
			//FIRST VALIDATE req.body FROM CLIENT, AGAINST CORRUPT DATA
			var valid = ajv.validate(schemas.admin, req.body)
			if(valid){
				const enteredPassword = req.body.password
				const enteredEmail = req.body.email

				adminDao.getPasswordfromDBviaEmail(enteredEmail)
							.then(
								idandpassword => {

								const savedPassword = idandpassword[0].password
								const admin_id = idandpassword[0].admin_id

								var validPassword = passwordUtil.comparePassword(enteredPassword, savedPassword)

								if(validPassword){
									loggly.log({success: 'ADMIN LOGGED IN'},['BITREC-ADMIN-LOGIN-OK']);
									var token = jwt.sign(admin_id, auth_config.JWT_SECRET_ADMIN)
								    return res.json({token: token, id: admin_id})
								}else{
									//console.log("PASSWORDS DON'T MATCH")
									logger.error({err: 'PASSWORD DID NOT MATCH'});
									loggly.log({err: 'PASSWORD DID NOT MATCH'},['BITREC-ADMIN-LOGIN-FAILED']);
									return res.status(401).send()
								}

							}).catch(
								err => res.status('500').json({err: err})
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

			jwt.verify(token, auth_config.JWT_SECRET_ADMIN, function(err,decoded){
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







	   return api;
	};
}());
