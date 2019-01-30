(function(){

	'use strict'

	module.exports = function(express,db){

		var api = express.Router(),
			 campaignDAO = require('../serverServices/campaignDao.js'),
			 campaignDao = campaignDAO(db),
			 jobseekerDAO = require('../serverServices/jobseekerDao.js'),
			 jobseekerDao = jobseekerDAO(db),
			 //campaignsDao = require('../serverServices/campaignsDAO.js'),
			 //campaignDaoClass = require('../serverServices/campaignDaoClass.js'),
			// campaignsDAO = new campaignDaoClass(db),
			 schemas = require('../schemas/schemas.js'),
			 Ajv = require('ajv'),
			 ajv = new Ajv(),
			 util = require('util');
	var log = require('../serverUtils/logger.js');
	var logger = log.child({SOURCE_FILE: 'jobseekerApi.js'});
	const loggly = require('../serverUtils/loggly.js');
	const asyncMiddleware = require('../serverUtils/asyncMiddleware.js');
		/*
			============THIS API IS OPEN TO PUBLIC, NOT SECURED=================
			asyncMiddleware(
		*/
		api.get('/all', asyncMiddleware(async (req, res, next)=>{
			/*
			IF USING DAO
      if there is an error thrown in dao, asyncMiddleware
      will pass it to next() and express will handle the error;
      */
			const sql = `SELECT * FROM campaigns`;
			const _db = await db;//resolve promise db
			const available_conn = await _db.getConnection();//check for available connection from the pool
			try {
				const [rows] = await available_conn.execute(sql,[]);
				available_conn.release();//releases connection back to the pool
				if (rows.length) {
					res.status(200).json(rows);
					next();
				} else {
					res.status(401).json('EMPTY RESPONSE FROM DB => ' + rows);
					next();
				}
			} catch (err) {
				res.status(500).json('SERVER ERROR: ' + err);
				next(err);
			}
		}));

		api.get('/positions', (req,res)=>{
		    campaignDao.getAllPositions()
		    .then(
		    	rows => {
		    	 res.status(200).json(rows);
		    }).catch(
		        err => {
			      console.log(err);
			      res.status(500).json('SERVER ERROR: ' + err);
			    });
		});

		api.get('/companies', asyncMiddleware(async (req,res)=>{

		    const [rows] = await campaignDao.getRegisteredCompanies();
		    res.status(200).json(rows);
		}));

		api.get('/jobseekers/:campaign_id', async (req,res) => {
			const [rows] = await jobseekerDao.getJobseekersByCampaign(req.params.campaign_id);
			res.status(200).json(rows);
		});

		api.post('/add-campaign', asyncMiddleware(async (req,res)=>{
			req.body.lng = '' + req.body.lng;
			req.body.lat = '' + req.body.lat;
			//console.log(typeof req.body.lat); //=== WRONG, MUST BE INTEGER, NOT STRING
			req.body.company_id = parseInt(req.body.company_id, 10);
			req.body.job_id = parseInt(req.body.job_id, 10);

			var valid = ajv.validate(schemas.campaign, req.body);
			if(valid){
				await campaignDao.addCampaign(req.body);
				res.status(200).json('New Campaign created with ref');
			}else{
				//console.log('jobseekerApi.js => Jobseeker data is INVALID! ' + util.inspect(ajv.errors));
				logger.error({err: ajv.errors});
				loggly.log({err: ajv.errors},['BITREC-SCHEMA-VALIDATION-FAILED']);
  				res.status('500').json({"SCHEMA-VALIDATION-FAILED " : ajv.errors})
			}
		}));

		api.put('/archived', (req,res)=>{
		  const campaign_id = req.query.campaign_id;

			campaignDao.updateCampaignStatus(req).then(response=>{
				//HERE WE SEND SENDGRID
				// var request = emailSender.emailrequest(email_id,
				//  										jobseeker_id,
				//  										first_name);

				/*
					=====EMAIL SENDER =======
				*/
					//emailSender.send(request)

					res.status(200).json(`CAMPAIGN_STATUS for campaign_id=${campaign_id} ARCHIVED`)
				}
			).catch(
				err=>console.log('/campaigns/archived ERROR ' + err)
			)

		});

		api.delete('/delete', async (req,res) => {
			await campaignDao.deleteCampaign(req.body.campaign_id);
			res.status(200).json(`CAMPAIGN ID ${req.body.campaign_id} DELETED`);
		});
		return api;
	}
}());
