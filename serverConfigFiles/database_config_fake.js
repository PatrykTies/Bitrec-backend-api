var fs = require('fs');
var database_config = {

		dev: {
			host: 'localhost',
			user: 'root',
			password: 'FAKE',
			database: 'resume_pro'
		},
		prod: {
			host: 'localhost',
			user: 'FAKE',
			password: 'FAKE',
			database: 'FAKE'
		},

		//FOR USE WITH 'promise-mysql'
		dev_pool:{
		  host: 'localhost',
		  user: 'FAKE',
		  password: 'FAKE',
		  database: 'FAKE',
		  connectionLimit: 10
		},
		// var conn = mysql.createConnection({host: "FAKE.mysql.database.azure.com",
		// user: "FAKE@FAKE", password: {FAKE}, database: {FAKE},
		// port: 3306, ssl:{ca:fs.readFileSync({ca-cert FAKE})}});

		azure_pool:{
		  host: 'FAKE.FAKE.database.azure.com',
		  user: 'FAKE@FAKE',
		  password: 'FAKE',
		  database: 'FAKE',
			port: 3306,
			ssl:{ca:fs.readFileSync('FAKE.crt.pem')},
		  connectionLimit: 10
		},
		prod_pool:{
			host: 'FAKE.c618aaydmq5z.eu-west-1.rds.FAKE.com',
			port: 3306,
			user: 'FAKE',
			password: 'FAKE',
			database: 'FAKE',
			connectionLimit: 10
		}
};

module.exports = database_config;
