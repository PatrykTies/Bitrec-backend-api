(function(){

	'use strict'

	class Campaign {

		constructor(json){
			this.campaign_id= this.generateRandomRefId(6)
			this.campaign_name= json.campaign_name
			this.job_description= json.job_description
			this.job_type= json.job_type//ENUM
			this.salary_type= json.salary_type//ENUM
			this.salary= json.salary
			this.lat= json.lat
			this.lng= json.lng
			this.location= json.location
			this.job_start_date= json.job_start_date//YYYY-MM-DD
			this.job_advert_finish_date= json.job_advert_finish_date//YYYY-MM-DD
      this.date_of_register= this.timestamp()
			this.company_id= json.company_id
			this.job_id= json.job_id
			this.deleted= 0
		}


    generateRandomRefId(n) {
        var add = 1, max = 12 - add;
        max        = Math.pow(10, n+add);
        var min    = max/10; // Math.pow(10, n) basically
        var number = Math.floor( Math.random() * (max - min + 1) ) + min;
				//return number;
        return ("" + number).substring(add);
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
  }

	module.exports = Campaign;
}())
