var bluePromise = require("bluebird"),
dbConnection = require('../../dbConnection.js');

var pinGenerationDao = {

		generatePin : () => {  

      const sql = "SELECT FLOOR(1000 + RAND() * 8999) AS companyPin FROM company WHERE 'companyPin' NOT IN (SELECT pin FROM company) LIMIT 1";

			return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {

    			return connection.query(sql).then(
            row => {
        				var responseData = {
        						"status":1,
        						"response":row
        				}
            return bluePromise.resolve(responseData);
    				
   			 	}).catch(
            error => {
     			 		var responseData = {
      						"status":0,
      						"response":error
      				}
        		  return bluePromise.reject(responseData);
    			});
			})

		}
	};

module.exports = pinGenerationDao;
	