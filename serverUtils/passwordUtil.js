(function(){


	'use strict'

	const bcryptjs = require('bcryptjs')

	const passwordUtil = {
		hashPassword : function(password){

			var hash = bcryptjs.hashSync(password, 8)
			return hash

			/* ASYNC
			bcryptjs.genSalt(8, function(err, salt) {
			    bcryptjs.hash(password, salt, function(err, hash) {
			    	if(err){throw err;};
			    	
			    	resolve(hash);
			    });
		    });*/
		},
		comparePassword : function(enteredPassword, savedPassword){

			var compareResult = bcryptjs.compareSync(enteredPassword, savedPassword)
				
			return compareResult//TRUE OR FALSE
		}
	}
	

	

	module.exports = passwordUtil
}())