
/********************************************  THIS IS NODE.JS API RELATED   *******************************************************/
(function(){

	'use strict'


	const fs = require('fs'),
		     nestedMYSQL = require('../nested-mysql.js'),
				 Jobseeker = require('../dataModels/jobseekerModel.js'),
				 PayDetails = require('../dataModels/payDetailsModel.js'),
				 Address = require('../dataModels/addressModel.js'),
				 PersonalTaxData = require('../dataModels/personalAndTaxModel.js'),
				 JobseekerPassword = require('../dataModels/jobseekerPassword.js');

	var log = require('../serverUtils/logger.js');
	var logger = log.child({SOURCE_FILE: 'jobseekerDao.js'});
	const loggly = require('../serverUtils/loggly.js');


	const jobseekerDao = (db) => ({


		createJobseeker : async (reqbody) => {

			//req.body.jobs_selected.map(job=>console.log('FROM DAO ' + job.company_id));

			//VALIDATE a jobseeker obj from Client
			var resumeurl = '';
			var jobseeker = new Jobseeker(reqbody);
			jobseeker.setResumeUrl(resumeurl);


		/*
			=========== UPLOADED PROFILE PICTURE HANDLER ==============
		*/
			// function decodeBase64Image(dataString){
			// 	  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
			// 	    response = {};
			//
			// 	  if (matches.length !== 3) {
			// 	    return new Error('Invalid input string');
			// 	  }
			//
			// 	  response.type = matches[1];
			// 	  response.data = new Buffer(matches[2], 'base64');
			// 	  return response;
			// }
			//
			// var decodedimg = decodeBase64Image(reqbody.profilepic);
			//
			// var fullname = jobseeker.getFullName();
			//
			// var filepath = './uploads/profilepic/' + fullname + '_profilepic.jpg';
			//
	    //     fs.writeFile(filepath, decodedimg.data, function(err) {
	    //       if(err) {
			//         return console.log(err);
			//    }else{
			//    	  jobseeker.setPictureUrl(filepath);
			//    }
			//
	    //     });
        //=========================================================================
        //================= MYSQL INSERT ====
        //=================================================
			const sql1 = 'INSERT INTO jobseeker SET ?';
			const sql3 = "INSERT INTO jobseeker_status(jobseeker_id,company_id,campaign_id,job_status,position_id) VALUES ?";

			const _db = await db;//resolve promise db
			const available_conn = await _db.getConnection();//check for available connection from the pool

			return available_conn.query(sql1,jobseeker).then(res=>{

				//ADDS NEW FIELD jobseeker_id TO EXISTING ARRAY TO MAKE NEW ARRAY OF ARRAYS
				var jobseeker_id = res[0].insertId;
				//console.log('JOBSEEKER from [jobseeker_id] '+jobseeker_id);

				//console.log('CAMPAIGN from [jobs_selected] '+req.body.jobs_selected[0].campaign_id);

				var	jobseeker_status_array = reqbody.jobs_selected.map(job=>{
						return [
							jobseeker_id,
							job.company_id,
							job.campaign_id,
							'applied',
							job.position_id
						]
					});

					return available_conn.query(sql3,[jobseeker_status_array]).then(
				      	    	res=>{

				      	    		console.log('Successfuly inserted into MySQL!');
				      	    		loggly.log({"NEW JOBSEEKER ADDED": res},['BITREC-POSTPUT-OK']);
		            				logger.info({"NEW JOBSEEKER ADDED": res});
												return jobseeker_id;
				      	    		//connection.release(); ???
				      	    })
				      	    .catch(
				      	    	err => {
												console.log('ERROR FROM DAO jobseeker_status: ' + err);
						      	// logger.error({err: err});
			      			  //   loggly.log({err: err},['BITREC-POSTPUT-FAILED']);
						      	  //Promise.reject(err);
							  	 });



			})
			.catch(err =>{
				console.log('ERROR FROM DAO jobseeker: ' + err);
				 //Promise.reject(err);
				available_conn.release();
			});


		},
		updateCVUrl: async (url,jobseeker_id) => {

			const sql = "UPDATE jobseeker SET ? WHERE ?";

			const _db = await db;//resolve promise db
			const available_conn = await _db.getConnection();//check for available connection from the pool

			try {
				console.log(require('util').inspect(url, { depth: null }) + ' + '+ jobseeker_id);
				await available_conn.query(sql,[{resume_url: url}, {jobseeker_id: jobseeker_id}]);
			} catch (err) {
				console.log('DAO RESUME URL ERROR' + err);
			}

		},
		updateImgUrl: async (url,jobseeker_id) => {

			const sql = "UPDATE jobseeker SET ? WHERE ?";

			const _db = await db;//resolve promise db
			const available_conn = await _db.getConnection();//check for available connection from the pool

			try {
				//console.log(require('util').inspect(url, { depth: null }) + ' + '+ jobseeker_id);
				await available_conn.query(sql,[{pic_url: url}, {jobseeker_id: jobseeker_id}]);
			} catch (err) {
				console.log('DAO PICTURE URL ERROR' + err);
			}

		},
		//createJobseeker()

			// return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {
			//
			//     return connection.query(sql1, jobseeker)
			//     		.then(res=>{
			// 	    			//console.log('NEW UTIL INSPECTOR: ' + util.inspect(res));
			// 		    		var jobseeker_id = res.insertId;
			//
			// 						//ADDS NEW FIELD jobseeker_id TO EXISTING ARRAY TO MAKE NEW ARRAY OF ARRAYS
			// 						var jobseeker_status_array = reqbody.jobs_selected.map(job=>{
			// 							return [
			// 								jobseeker_id,
			// 								job.company_id,
			// 								job.campaign_id,
			// 								'applied',
			// 								job.position_id
			// 							]
			// 						});
			//
			// 						//=========================RELEASE CONNECTION BACK TO POOL =============================================!!!!!!!!
			// 						//https://stackoverflow.com/questions/35491132/promise-mysql-cannot-release-connections-back-to-the-pool
			// 		        connection.query(sql3, [jobseeker_status_array])//[jobseeker_status_array.join()]
			// 		        	  .then(
			// 			      	    	res=>{
			//
			// 			      	    		console.log('Successfuly inserted into MySQL!');
			// 			      	    		loggly.log({"NEW JOBSEEKER ADDED": res},['BITREC-POSTPUT-OK']);
			// 	            				logger.info({"NEW JOBSEEKER ADDED": res});
			//
			// 			      	    		//connection.release(); ???
			// 			      	    })
			// 			      	    .catch(
			// 			      	    	err => {
			// 					      	logger.error({err: err});
			// 		      			    loggly.log({err: err},['BITREC-POSTPUT-FAILED']);
			// 					      	return bluePromise.reject(err);
			// 				  	 });
			//
			// 			    return bluePromise.resolve(jobseeker_id);
			//
			//
			//       	    }).catch(
			//       	    	err => {
			// 		     	 	logger.error({err: err});
			// 		      		loggly.log({err: err},['BITREC-POSTPUT-FAILED']);
			// 		     	 	return bluePromise.reject(err);
			// 		  	  	}
			// 		  	)
			//});

		updateJobseekerJobStatus: async req => {

			const job_status = req.body.job_status;
			const jobseeker_id = req.query.jobseeker_id;
			const campaign_id = req.query.campaign_id;

			//const sql = "UPDATE jobseeker_status SET job_status= ? WHERE jobseeker_id= ? and campaign_id= ?";
			const sql = "UPDATE jobseeker_status SET ? WHERE ?";

			const _db = await db;//resolve promise db
			const available_conn = await _db.getConnection();//check for available connection from the pool

			try {
				console.log(require('util').inspect(job_status, { depth: null }) + ' + '+ jobseeker_id);
				await available_conn.query(sql,[{job_status: job_status}, {jobseeker_id: jobseeker_id},{campaign_id: campaign_id}]);

			} catch (err) {

				console.log('DAO ERRROR' + err);
			}

		},
		addJobseekerPassword: async reqbody => {


			const jobseekerPass = new JobseekerPassword(reqbody);
			//const jobseeker_id = jobseekerPass.getId();

			const sql = "UPDATE jobseeker SET ? WHERE jobseeker_id= ?";

			try {
				const _db = await db;//resolve promise db
				const available_conn = await _db.getConnection();//check for available connection from the pool
				await available_conn.query(sql,[jobseekerPass, reqbody.jobseeker_id]);
			  //available_conn.release();//releases connection back to the pool
			  return reqbody.jobseeker_id;//NEEDED FOR RESPONSE IN API

			}catch (err) {
				//available_conn.release();
				console.log('DAO ERRROR' + err);
			}

		},
		getPasswordfromDB : jobseeker_id => {


			const sql = "SELECT password FROM jobseeker WHERE jobseeker_id= ?";

			return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {

			    return connection.query(sql, jobseeker_id)
			    		.then(
			    			response => {
			    				return bluePromise.resolve(response);
			    			}
			      	    ).catch(
			      	    	err => {
				      			logger.error({err: err});
				      			loggly.log({err: err},['BITREC-GET-FAILED']);
								return bluePromise.reject(err);
					  	    }
				  	    );
			});




		},

		getPasswordfromDBviaEmail : async email => {

			const sql = "SELECT jobseeker_id,password FROM jobseeker WHERE email_id= ?";

			const _db = await db;//resolve promise db
			const available_conn = await _db.getConnection();//check for available connection from the pool

			try {
				const rows = await available_conn.execute(sql,[email]);
				available_conn.release();//releases connection back to the pool
				return rows;
			} catch (err) {
				available_conn.release();
				console.log('DAO ERRROR' + err);
			}
			//
			// return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {
			//
			//     return connection.query(sql, email)
			//     		.then(
			//     			response => {
			//     				return bluePromise.resolve(response);
			//     			}
			//       	    ).catch(
			//       	    	err => {
			// 	      			logger.error({err: err});
			// 	      			loggly.log({err: err},['BITREC-GET-FAILED']);
			// 					return bluePromise.reject(err);
			// 		  	    }
			// 	  	    );
			// });
		},

		getJobseekersByCampaign : async campaign_id => {

			var sql = 'SELECT * FROM jobseeker_status \
						LEFT JOIN jobseeker \
						ON jobseeker.jobseeker_id = jobseeker_status.jobseeker_id \
						WHERE campaign_id = ?';
			//Key relations, Define each table's primary and foreign keys
		    // var nestingOptions = [
		    //     { tableName : 'jobseeker', pkey: 'jobseeker_id'},
		    //     { tableName : 'tests_scores', pkey: 'test_category_id', fkeys:[{table:'jobseeker',col:'jobseeker_id'}]}
				//
		    // ];
				const _db = await db;//resolve promise db
				const available_conn = await _db.getConnection();//check for available connection from the pool

				try {
					const rows = await available_conn.execute(sql,[campaign_id]);
					available_conn.release();//releases connection back to the pool
					return rows;
				} catch (err) {
					available_conn.release();
					console.log('DAO ERRROR' + err);
				}

			//
			// return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {
			//
			//     return connection.query({sql: sql}, [campaign_id])
			//     		.then(function(rows){
			//
 	   //                      //connection.release(); ???
			//
			// 	            //var nestedRows = nestedMYSQL.convertToNested(rows, nestingOptions);
			//
			// 	            return bluePromise.resolve(rows);
			//
			//       	    }).catch(function(err) {
			// 		      console.log(err);
			// 		      return bluePromise.reject(err);
			// 		    });
			//
			//
			// });

		},

		getNestedJobseekersPerCampaign : ()=>{

			var sql = 'SELECT * FROM campaigns \
						LEFT JOIN jobseeker_status\
						ON jobseeker_status.campaign_id = campaigns.campaign_id \
						LEFT JOIN jobseeker \
						ON jobseeker.jobseeker_id = jobseeker_status.jobseeker_id';
			//Key relations, Define each table's primary and foreign keys
		    var nestingOptions = [
					//==============================WHAT I KNOW ===================
						//CALL TABLES IN SAME ORDER AS CALLED FROM SQL QUERY - OTHERWISE IT WONT WORK



		        { tableName : 'jobseeker', pkey: 'jobseeker_id',//TO FILTRUJE PER campaigns
					fkeys:[{table:'jobseeker_status',col:'jobseeker_id'},{table:'campaigns',col:'campaign_id'}]},
						{ tableName : 'campaigns', pkey: 'campaign_id',fkeys:[{table:'jobseeker_status',col:'jobseeker_id'}]},
						{ tableName : 'jobseeker', pkey: 'jobseeker_id'},

						// { tableName : 'jobseeker', pkey: 'jobseeker_id',fkeys:[
						// {table:'jobseeker_status',col:'campaign_id'}]},
						//
						// { tableName : 'jobseeker_status', pkey: 'campaign_id',fkeys:[{table:'campaigns',col:'campaign_id'}]},
						// { tableName : 'jobseeker', pkey: 'jobseeker_id',fkeys:[{table:'jobseeker_status',col:'jobseeker_id'}]},

						// { tableName : 'campaigns', pkey: 'campaign_id'},
						// { tableName : 'jobseeker_status', pkey: 'jobseeker_id',
						// fkeys:[{table:'jobseeker',col:'jobseeker_id'}]},
						// { tableName : 'jobseeker', pkey: 'jobseeker_id'}


						//
						// { tableName : 'campaigns', pkey: 'campaign_id'},
						// { tableName : 'jobseeker_status', pkey: 'campaign_id',fkeys:[
						// {table:'campaigns',col:'campaign_id'},{table:'jobseeker',col:'jobseeker_id'}]},
						// { tableName : 'jobseeker_status', pkey: 'jobseeker_id',
						// fkeys:[{table:'jobseeker',col:'jobseeker_id'}]},


						// {tableName : 'skill2jobseeker', pkey: 'skill_id', fkeys:[{table:'jobseeker',col:'jobseeker_id'},
						// 										{table:'skill2category',col:'skill_id'},
						// 									 ]},

		    ];

			return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {

			    return connection.query({sql: sql, nestTables: true})
			    		.then(function(rows){

 	                        //connection.release(); ???

				            var nestedRows = nestedMYSQL.convertToNested(rows, nestingOptions);

				            return bluePromise.resolve(nestedRows);

			      	    }).catch(function(err) {
					      console.log(err);
					      return bluePromise.reject(err);
					    });


			});

		},


		getNestedJobseekers : ()=>{

			var sql = 'SELECT * FROM jobseeker \
						LEFT JOIN tests_scores \
						ON tests_scores.jobseeker_id = jobseeker.jobseeker_id';
			//Key relations, Define each table's primary and foreign keys
		    var nestingOptions = [
		        { tableName : 'jobseeker', pkey: 'jobseeker_id'},
		        { tableName : 'tests_scores', pkey: 'test_category_id', fkeys:[{table:'jobseeker',col:'jobseeker_id'}]}

		    ];

			return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {

			    return connection.query({sql: sql, nestTables: true})
			    		.then(function(rows){

 	                        //connection.release(); ???

				            var nestedRows = nestedMYSQL.convertToNested(rows, nestingOptions);

				            return bluePromise.resolve(nestedRows);

			      	    }).catch(function(err) {
					      console.log(err);
					      return bluePromise.reject(err);
					    });


			});

		},
		getNestedWorkers: async ()=>{
			var sql = 'SELECT * FROM jobseeker_status \
						LEFT JOIN jobseeker \
						ON jobseeker.jobseeker_id = jobseeker_status.jobseeker_id \
						WHERE job_status="selected"';
			//Key relations, Define each table's primary and foreign keys
		    var nestingOptions = [
		       // { tableName : 'jobseeker', pkey: 'jobseeker_id',fkeys:[{table:'jobseeker_status',col:'jobseeker_id'}]}

						{tableName : 'jobseeker', pkey: 'jobseeker_id'},
		        {tableName : 'jobseeker_status', pkey: 'jobseeker_id', fkeys:[{table:'jobseeker',col:'jobseeker_id'}]
		       											// {table:'test_category',col:'test_category_id'}]},
															}
		    ];

				const _db = await db;//resolve promise db
				const available_conn = await _db.getConnection();//check for available connection from the pool

				try {
					const [rows,response] = await available_conn.execute({sql:sql, nestTables:true},[]);
					available_conn.release();//releases connection back to the pool
					var nestedRows = nestedMYSQL.convertToNested(rows, nestingOptions);
					return nestedRows;
				} catch (err) {
					available_conn.release();
					console.log('DAO ERRROR' + err);
			  }
		},
		getNestedWorker: async jobseeker_id=>{
			var sql = "SELECT * \
						FROM jobseeker   \
						LEFT JOIN tests_scores \
						ON tests_scores.jobseeker_id = jobseeker.jobseeker_id \
						LEFT JOIN test_category \
						ON test_category.test_category_id = tests_scores.test_category_id \
						LEFT JOIN skill2jobseeker\
						ON skill2jobseeker.jobseeker_id = jobseeker.jobseeker_id\
						LEFT JOIN skill2category\
						ON skill2category.skill_id = skill2jobseeker.skill_id\
						LEFT JOIN skill_categories \
						ON skill2category.skill_category_id = skill_categories.skill_category_id \
						LEFT JOIN reviews\
						ON jobseeker.jobseeker_id = reviews.jobseeker_id\
						WHERE jobseeker.jobseeker_id =?";


			//Key relations, Define each table's primary and foreign keys
		    var nestingOptions = [
		        {tableName : 'jobseeker', pkey: 'jobseeker_id'},
		        {tableName : 'tests_scores', pkey: 'test_category_id', fkeys:[{table:'jobseeker',col:'jobseeker_id'},
		       											 {table:'test_category',col:'test_category_id'}]},
		        {tableName : 'test_category', pkey: 'test_category_id'},

		        {tableName : 'skill2jobseeker', pkey: 'skill_id', fkeys:[{table:'jobseeker',col:'jobseeker_id'},
		       											 {table:'skill2category',col:'skill_id'},
		       											]},
		        {tableName : 'skill2category', pkey: 'skill_id', fkeys:
		        											[{table:'skill_categories',col:'skill_category_id'}]},

		        {tableName : 'skill_categories', pkey: 'skill_category_id'},

		        {tableName : 'reviews', pkey: 'review_id', fkeys:[{table:'jobseeker',col:'jobseeker_id'}]}

		    ];
			//Key relations, Define each table's primary and foreign keys

				try {
					const _db = await db;//resolve promise db
					const available_conn = await _db.getConnection();//check for available connection from the pool

					const [rows,response] = await available_conn.execute({sql:sql, nestTables:true},[jobseeker_id]);
					//available_conn.release();//releases connection back to the pool
					var nestedRows = nestedMYSQL.convertToNested(rows, nestingOptions);
					return nestedRows;
				} catch (err) {
					//available_conn.release();
					console.log('DAO ERRROR' + err);
			  }
		},
		getNestedJobseeker : jobseeker_id =>{

			var sql = "SELECT * \
						FROM jobseeker   \
						LEFT JOIN tests_scores \
						ON tests_scores.jobseeker_id = jobseeker.jobseeker_id \
						LEFT JOIN test_category \
						ON test_category.test_category_id = tests_scores.test_category_id \
						LEFT JOIN skill2jobseeker\
						ON skill2jobseeker.jobseeker_id = jobseeker.jobseeker_id\
						LEFT JOIN skill2category\
						ON skill2category.skill_id = skill2jobseeker.skill_id\
						LEFT JOIN skill_categories \
						ON skill2category.skill_category_id = skill_categories.skill_category_id \
						LEFT JOIN reviews\
						ON jobseeker.jobseeker_id = reviews.jobseeker_id\
						WHERE jobseeker.jobseeker_id =?";


			//Key relations, Define each table's primary and foreign keys
		    var nestingOptions = [
		        {tableName : 'jobseeker', pkey: 'jobseeker_id'},
		        {tableName : 'tests_scores', pkey: 'test_category_id', fkeys:[{table:'jobseeker',col:'jobseeker_id'},
		       											 {table:'test_category',col:'test_category_id'}]},
		        {tableName : 'test_category', pkey: 'test_category_id'},

		        {tableName : 'skill2jobseeker', pkey: 'skill_id', fkeys:[{table:'jobseeker',col:'jobseeker_id'},
		       											 {table:'skill2category',col:'skill_id'},
		       											]},
		        {tableName : 'skill2category', pkey: 'skill_id', fkeys:
		        											[{table:'skill_categories',col:'skill_category_id'}]},

		        {tableName : 'skill_categories', pkey: 'skill_category_id'},

		        {tableName : 'reviews', pkey: 'review_id', fkeys:[{table:'jobseeker',col:'jobseeker_id'}]}

		    ];

		    return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {

			    return connection.query({sql: sql, nestTables: true},[jobseeker_id])
			    		.then(function(rows){

			    			//connection.release(); ???

				            var nestedRows = nestedMYSQL.convertToNested(rows, nestingOptions);

				            //return nestedRows; = WORKS TOO ???
				            return bluePromise.resolve(nestedRows);


			      	    }).catch(function(err) {
					      console.log(err);
					      return bluePromise.reject(err);
					    });

			});

		},
		  //=======================================WORKER DAO==============================
		addBankDetails: async req => {

			const jobseeker_id = req.params.jobseeker_id;
			const pay_details = new PayDetails(req.body);

			const sql = "UPDATE jobseeker SET ? WHERE jobseeker_id= ?";

			try {
				const _db = await db;//resolve promise db
				const available_conn = await _db.getConnection();//check for available connection from the pool
				return await available_conn.query(sql, [pay_details, jobseeker_id]);//THIS AUTOMATICALY RELEASE CONN BACK TO POOL
			}catch (err) {
				//available_conn.release();
				console.log('DAO ERRROR' + err);
			}

		},
		addAddressDetails: async req => {
			const jobseeker_id = req.params.jobseeker_id;
			const address_details = new Address(req.body);

			const sql = "UPDATE jobseeker SET ? WHERE jobseeker_id= ?";

			try {
				const _db = await db;//resolve promise db
				const available_conn = await _db.getConnection();//check for available connection from the pool
				return await available_conn.query(sql, [address_details, jobseeker_id]);//THIS AUTOMATICALY RELEASE CONN BACK TO POOL
			}catch (err) {
				console.log('DAO ERRROR' + err);
			}


		},
		addPersonalTaxData: async req => {
			const jobseeker_id = req.params.jobseeker_id;
			const personal_tax_data = new PersonalTaxData(req.body);

			const sql = "UPDATE jobseeker SET ? WHERE jobseeker_id= ?";

			try {
				const _db = await db;//resolve promise db
				const available_conn = await _db.getConnection();//check for available connection from the pool
				return await available_conn.query(sql, [personal_tax_data, jobseeker_id]);//THIS AUTOMATICALY RELEASE CONN BACK TO POOL
			}catch (err) {
				console.log('DAO ERRROR' + err);
			}
		},
	});





	module.exports = jobseekerDao;

}());
