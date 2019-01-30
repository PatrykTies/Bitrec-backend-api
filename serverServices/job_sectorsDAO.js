
/********************************************  THIS IS NODE.JS API RELATED   *******************************************************/
(function(){

	'use strict'
	const nestedMYSQL = require('../nested-mysql.js');
	const jobSectorsDao = (db)=>({

		getNestedJobSectors: async ()=>{
			const _db = await db;//resolve promise db
			const available_conn = await _db.getConnection();//check for available connection from the pool
			const sql = 'SELECT * FROM job_sectors \
                  LEFT JOIN job_titles\
                  ON job_titles.sector_id = job_sectors.sector_id';
			const nestingOptions = [
					{ tableName : 'job_sectors', pkey: 'sector_id'},
					{ tableName : 'job_titles', pkey: 'job_title_id', fkeys:[{table:'job_sectors',col:'sector_id'}]}
			];

			try {
				const [rows,result] = await available_conn.execute({sql:sql, nestTables:true},[]);
				available_conn.release();//releases connection back to the pool
				const nestedRows = nestedMYSQL.convertToNested(rows, nestingOptions);
				return nestedRows;
			} catch (err) {
				available_conn.release();
				console.log('DAO ERRROR' + err);
			}
		},

	})


	module.exports = jobSectorsDao;

}());
