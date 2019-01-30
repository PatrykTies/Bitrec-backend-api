(function(){

	'use strict'

	var passwordUtil = require('../serverUtils/passwordUtil.js')

	/*
		===============  TO DO ===========================
		1. move timestamp and totalscore to outer files.
	*/

	class Jobseeker {

		constructor(json){
			this.first_name= json.first_name
			this.last_name= json.last_name
			this.age= json.age
			this.email_id= json.email_id
			this.nationality= json.nationality
			this.contact_no= json.contact_no
			this.postal_code= json.postal_code
			this.resume_url= ''
			this.pic_url= ''
			this.rating= 4
			this.intro_txt= 'sdfsdfsdf fsdfd sfsdf fs'
			this.employement_status= json.employement_status
			this.when_to_start_work= json.when_to_start_work
			this.worked_before= json.worked_before
			this.english_level= 1
			this.total_score= this.totalScore(this.english_level,
											  this.employement_status,
											  this.when_to_start_work)
			this.date_of_register= this.timestamp()	

		}

		//GETTERS
		getFullName(){
			return this.first_name +'-'+ this.last_name;
		}


		//SETTERS
		setResumeUrl(resumeurl){
			this.resume_url = resumeurl;
		}
		setPictureUrl(pictureurl){
			this.pic_url = pictureurl;
		}
		timestamp() {
				    var d = new Date(Date.now()),
				        month = '' + (d.getMonth() + 1),
				        day = '' + d.getDate(),
				        year = d.getFullYear(),
				        hours = d.getHours(),
				        minutes = d.getMinutes(),
				        seconds = d.getSeconds();


				    if (month.length < 2) month = '0' + month;
				    if (day.length < 2) day = '0' + day;

				    var formattedDate = [year, month, day].join('/');
				    var formattedTime = [hours, minutes, seconds].join(':');

				    return formattedDate +' '+ formattedTime;
				};

		totalScore(english,availability,whenCanStart){
				var totalScore = 0;


				if(availability){
					if(availability == 1 ) totalScore += 30;
					else if (availability == 2) totalScore += 10;
					else if (availability == 3) totalScore -= 20;
					else if (availability == 4) totalScore += 10;
				}else {
					console.log('no availability OR when_to_start_work answer has been passed!');
				}


				if(whenCanStart){
					if(whenCanStart == 1 ) totalScore += 30;
					else if (whenCanStart == 2) totalScore += 10;
					else if (whenCanStart == 3) totalScore -= 10;
					else if (whenCanStart == 4) totalScore -= 50;
				}else {
					console.log('no availability OR when_to_start_work answer has been passed!');
				}


				if(english){
					if(english == 1) totalScore += 40;
					else if (english == 2) totalScore += 20;
					else if (english == 3) totalScore += 10;

				}else {
					console.log('no english lvl answer has been passed!');
				}

				return totalScore;
			};

	}

	module.exports = Jobseeker
}())
