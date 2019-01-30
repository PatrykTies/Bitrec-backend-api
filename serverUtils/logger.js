(function(){

	'use strict';

	const bunyan = require('bunyan');
	const log = bunyan.createLogger({
	  name: 'bitrec-AWS',
	  streams: [
	    {
	    	//THIS WILL ONLY LOG HERE, via logger.info({msg: 'MESSAGE'})
	      level: 'info',
	      path: 'serverLog/info.log'            
	    },
	    {
	    	//THIS WILL LOG 2 TIMES: HERE AND INFO, via logger.error({err: err})
	      level: 'error',
	      //stream: process.stdout,//AND TO A CONSOLE
	      path: 'serverLog/error.log'   
	    }
	  ]
	});

	module.exports = log;
}());

