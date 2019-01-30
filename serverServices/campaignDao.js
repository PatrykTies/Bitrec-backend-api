
/********************************************  THIS IS NODE.JS API RELATED   *******************************************************/
(function(){

	'use strict'
	const Campaign = require('../dataModels/campaignModel.js');

	const campaignDao = (db) => ({

		getRegisteredCompanies: async ()=>{
			const _db = await db;//resolve promise db
			const available_conn = await _db.getConnection();//check for available connection from the pool
			const sql = 'SELECT * FROM company';
			try {
				const [rows,result] = await available_conn.execute(sql,[]);
				available_conn.release();//releases connection back to the pool
				return rows;
			} catch (err) {
				available_conn.release();
				console.log('DAO ERRROR' + err);
			}
		},
		getAllCampaigns : async ()=>{

			const sql = "SELECT * FROM campaigns ORDER BY auto_campaign_id DESC";
			const _db = await db;//resolve promise db
			const available_conn = await _db.getConnection();//check for available connection from the pool
			try {
				const rows = await available_conn.execute(sql,[]);
				available_conn.release();//releases connection back to the pool
				return rows;
			} catch (err) {
				available_conn.release();
				console.log('DAO ERRROR' + err);
			}
		},
		addCampaign : async (reqbody) => {

			const new_campaign = new Campaign(reqbody);

			const _db = await db;//resolve promise db
			const available_conn = await _db.getConnection();//check for available connection from the pool

			const sql = "INSERT campaigns SET ?";
			try {
			  await available_conn.query(sql,[new_campaign]);
				available_conn.release();//releases connection back to the pool
			} catch (err) {
				available_conn.release();
				console.log('DAO ERRROR' + err);
			}
		},
		updateCampaignStatus: async req => {

			const campaign_status = req.body.campaign_status;
			const campaign_id = req.query.campaign_id;

			//const sql = "UPDATE jobseeker_status SET job_status= ? WHERE jobseeker_id= ? and campaign_id= ?";
			const sql = "UPDATE campaigns SET ? WHERE ?";

			const _db = await db;//resolve promise db
			const available_conn = await _db.getConnection();//check for available connection from the pool

			try {
				//console.log(require('util').inspect(job_status, { depth: null }) + ' + '+ jobseeker_id);
				await available_conn.query(sql,[{campaign_status: campaign_status}, {campaign_id: campaign_id}]);

			} catch (err) {

				console.log('DAO UPDATE CAMPAIGN_STATUS ERROR' + err);
			}

		},
		deleteCampaign : async campaign_id => {

			const _db = await db;//resolve promise db
			const available_conn = await _db.getConnection();//check for available connection from the pool

			const sql = "DELETE FROM campaigns WHERE ?";
			try {
			  await available_conn.query(sql,[{campaign_id: campaign_id}]);

			} catch (err) {
				console.log('DAO DELETION ERROR' + err);
			}
		},

	})

	module.exports = campaignDao;

	// 'use strict'
	//
  // const mysql = require('mysql2/promise'),
	// 		  util = require('util'),
	// 		  Campaign = require('../dataModels/campaignModel.js');
	//
	// var log = require('../serverUtils/logger.js');
	// var logger = log.child({SOURCE_FILE: 'campaignDao.js'});
	// const loggly = require('../serverUtils/loggly.js');
	//
	// var campaignDao = {
	//
	// 	getRegisteredCompanies: async (db)=>{
	// 		const sql = 'SELECT * FROM company';
	// 		try {
  //       const _db = await db;//resolve promise db
	// 			const available_conn = await _db.getConnection();//check for available connection from the pool
	// 			const rows = await _db.execute(sql,[]);
	// 			available_conn.release();//releases connection back to the pool
	// 			return rows;
	// 		} catch (err) {
	// 			available_conn.release();
	// 			console.log('DAO ERRROR' + err);
	// 		}
	// 	},
	// 	getAllCampaigns : async (db)=>{
	//
	// 		const sql = "SELECT * FROM campaigns ORDER BY campaign_id DESC";
	// 		try {
  //       const _db = await db;//resolve promise db
	// 			const available_conn = await _db.getConnection();//check for available connection from the pool
	// 			const rows = await _db.execute(sql,[]);
	// 			available_conn.release();//releases connection back to the pool
	// 			return rows;
	// 		} catch (err) {
	// 			available_conn.release();
	// 			console.log('DAO ERRROR' + err);
	// 		}
	// 	},
	// 	addCampaign : async (reqbody,db) => {
	//
	// 		const new_campaign = new Campaign(reqbody);
	//
	// 		const _db = await db;//resolve promise db
	// 		const available_conn = await _db.getConnection();//check for available connection from the pool
	//
	// 		const sql = "INSERT campaigns SET ?";
	// 		try {
	// 		  await _db.query(sql,[new_campaign]);
	// 			available_conn.release();//releases connection back to the pool
	// 		} catch (err) {
	// 			available_conn.release();
	// 			console.log('DAO ERRROR' + err);
	// 		}
	// 	},

	//}



}());
