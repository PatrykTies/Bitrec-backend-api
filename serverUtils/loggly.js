(function(){

	'use strict';

  var loggly = require('loggly');
 
  var loggly_client = loggly.createClient({
    token: "fb5d12a7-9c90-4839-9da7-e8702ca460e2",
    subdomain: "bitrechroapp",
    auth: {
      username: "patryk",
      password: "01Zoohr10"
    },
    tags: [ 
            'BITREC-HTTP',
            'BITREC-SERVER-PROCESS',
            'BITREC-HACK-ATTEMPT',
            'BITREC-POSTPUT-FAILED',
            'BITREC-POSTPUT-OK',
            'BITREC-INFO',
            'BITREC-GET-FAILED',
            'BITREC-ADMIN-LOGIN-OK',
            'BITREC-ADMIN-LOGIN-FAILED',
            'BITREC-JOBSEEKER-LOGIN-OK',
            'BITREC-JOBSEEKER-LOGIN-FAILED',
            'BITREC-CLIENT-LOGIN-OK',
            'BITREC-CLIENT-LOGIN-FAILED',
            'BITREC-WORKER-LOGIN-OK',
            'BITREC-WORKER-LOGIN-FAILED',
            'BITREC-SCHEMA-VALIDATION-FAILED',
            'SENDGRID-EMAILSENT-OK',
            'SENDGRID-EMAILSENT-FAILED'


            ],
    json: true
  });

	module.exports = loggly_client;
}());

