
const mysql = require('mysql2/promise'),
database_config = require('./serverConfigFiles/database_config.js');

//pool = mysql.createPool(database_config.dev_pool);

//const conn = new mysql.createConnection(database_config.dev_pool);

dbConnection = {

	getMySQL_PoolConnection: ()=>{
		return pool.getConnection(
		    function (err) {
		        if (err) {
		            console.log("!!! Cannot connect !!! Error:");
		            throw err;
		        }
		        else {
		            console.log("Connection established.");
		            readData();
		        }
		    });
	},
	getMySQL_Connection: ()=>{
		let connection = mysql.createConnection(database_config.prod_pool);
	  return connection;
		// if(connection){
		// 	console.log('CONNECTED TO DB!!!!!');
		// 	return connection;
		// }else{
		// 	console.log("!!! Cannot connect !!! Error:")
		// };

	},

		/*
			USING BLUEBIRD'S PROMISE-MYSQL POOLING
		*/
		// getMySQL_PoolConnection: () => {
		// 	return pool.getConnection().disposer(
		// 		connection => {
		// 	   	 	pool.releaseConnection(connection);
		// 	    //console.log('DB CONNECTION CLOSED!');
		// 		});
		// }


};
module.exports = dbConnection;
