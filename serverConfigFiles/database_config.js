var fs = require('fs');
var database_config = {

		dev: {
			host: 'localhost',
			user: 'root',
			password: '01kintamani10',
			database: 'resume_pro'
		},
		prod: {
			host: 'localhost',
			user: 'root',
			password: 'kamikaze13',
			database: 'resume_pro'
		},

		//FOR USE WITH 'promise-mysql'
		dev_pool:{
		  host: 'localhost',
		  user: 'patryk',
		  password: 'patrykties',//was kamikaze13
		  database: 'resume_pro',
		  connectionLimit: 10
		},
		// var conn = mysql.createConnection({host: "teamsuppmysql.mysql.database.azure.com",
		// user: "teamsuppadmin@teamsuppmysql", password: {your_password}, database: {your_database},
		// port: 3306, ssl:{ca:fs.readFileSync({ca-cert filename})}});

		azure_pool:{
		  host: 'teamsuppmysql.mysql.database.azure.com',
		  user: 'teamsuppadmin@teamsuppmysql',
		  password: '01Kintamani10',
		  database: 'resume_pro',
			port: 3306,
			ssl:{ca:fs.readFileSync('BaltimoreCyberTrustRoot.crt.pem')},
		  connectionLimit: 10
		},
		prod_pool:{
			host: 'bitrecdb.c618aaydmq5z.eu-west-1.rds.amazonaws.com',
			port: 3306,
			user: 'patrykties',
			password: '01kintamani10',
			database: 'resume_pro',
			connectionLimit: 10
		}
};

module.exports = database_config;
