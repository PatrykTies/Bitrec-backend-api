(function(){

	'use strict'
    
	var passwordUtil = require('../serverUtils/passwordUtil.js');

	class Admin {

		constructor(json){
			this.email = json.email;
			this.password = this.hashPassword(json.password);	
		}	

		//GETTERS
		getPassword(){
			console.log(this.password);
		}
		//THIS WORKS NOT-ASYNC
		hashPassword(password){
			return passwordUtil.hashPassword(password);
		}
		
	}

	module.exports = Admin;
}());
