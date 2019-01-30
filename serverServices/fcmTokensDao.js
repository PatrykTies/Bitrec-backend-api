(function(){

	var dbConnection = require('./dbConnection.js');
	var log = require('../serverUtils/logger.js');
	var logger = log.child({SOURCE_FILE: 'fcmTokensDao.js'});
	const loggly = require('../serverUtils/loggly.js');
	
	var fcmTokensDao = {


		 saveToken: token => { 

		 		/*TOKEN IS  token: {
						subscriber_id : '123',  ===TAKEN FROM PIN LOGIN in mobile app
						token: 'dsfsdgfdfgdhfghyfhfghfh' === received from FCM on subscribe
						subscriberType: '1'===client or '0'===admin or '2'===jobseeker
					}*/

			const sql = "INSERT INTO fcmtokens SET?";

		 	return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {
			
			    return connection.query(sql, token)
			    		.then(
			    			response =>{
							    
				            	return bluePromise.resolve(response);
				        	}     
			      	    ).catch(err => {
					     	
					        connection.rollback(function(){
					      			 //console.log('DB INSERTION ERROR from DAO: ' + err);
					      			 logger.error({err: err});	
					      			 loggly.log({err: err},['BITREC-POSTPUT-FAILED']); 	 
							});

							return bluePromise.reject(err);	
					    });	
			});
		}

	};

	module.exports = fcmTokensDao;

}());
