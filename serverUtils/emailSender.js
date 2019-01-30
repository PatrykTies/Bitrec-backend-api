(function(){

	'use strict'

	var log = require('./logger.js');
	var logger = log.child({SOURCE_FILE: 'emailSender.js'});
	const loggly = require('./loggly.js');

	var sg = require("sendgrid")("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");
	var helper = require('sendgrid').mail;


	var emailSender = {
		emailrequest: (email_id, jobseeker_id, full_name) => {


			var from_email = new helper.Email('do-not-reply@team-supporter.co.uk');
			var to_email = new helper.Email(email_id);
			var subject = "Welcome from Team Supporter. Don't respond to this email";
			var content = new helper.Content('text/html', '<html></html>');
			var personalization = new helper.Personalization();
			var substitutionName = new helper.Substitution("%name%", full_name);
			var substitutionUrl = new helper.Substitution('%password_url%',
				'http://localhost:4200/myprofile/createpassword?id=' + jobseeker_id +'&email='+ email_id);

			var email = new helper.Email(email_id, full_name)
	  		personalization.addTo(email);
			personalization.addSubstitution(substitutionName);
	  		personalization.addSubstitution(substitutionUrl);

			var mail = new helper.Mail(
				from_email,
				subject,
				to_email,
				content
			);




	  		mail.addPersonalization(personalization);
			mail.setTemplateId("7613e4fe-9c24-40f7-b82f-49c1e085827a");


			var request = sg.emptyRequest({
			  method: 'POST',
			  path: '/v3/mail/send',
			  body: mail.toJSON(),
			});

			return request;
		},
		send: request => {
			 sg.API(request)
				.then(response => {
				    //console.log(response.statusCode);
				    //console.log(response.body);
				    //console.log(response.headers);
				    loggly.log({"NEW EMAIL SENT": response.body},['SENDGRID-EMAILSENT-OK']);
				    logger.info({"NEW EMAIL SENT": response.body});
				  })
				  .catch(error => {
				    //error is an instance of SendGridError
				    //The full response is attached to error.response
				     console.log(error.response);
				     logger.error({err: error.response});
					 loggly.log({err: error.response},['SENDGRID-EMAILSENT-FAILED']);
				 });



		}
	}

	module.exports = emailSender;
}());
