(function(){

	'use strict'
    
	var passwordUtil = require('../serverUtils/passwordUtil.js');

	class JobseekerPassword {

		constructor(json){
			this.email_id = json.email;
			this.password = this.hashPassword(json.password);
			this.jobseeker_id = json.jobseeker_id;	
		}	

		//GETTERS
		getId(){
			return this.jobseeker_id;
		}
		//THIS WORKS NOT-ASYNC
		hashPassword(password){
			return passwordUtil.hashPassword(password);
		}
		
	}

	module.exports = JobseekerPassword;
}());
