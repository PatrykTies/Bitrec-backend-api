(function(){

	'use strict'

	class PayDetails {

		constructor(json){
			this.acc_no= json.acc_no//int 8
			this.sort_code= json.sort_code//int 6
			this.pay_method= json.pay_method//ENUM => 'BANK_TRANSFER'(Default) 'CHEQUE' 'CASH' 'PAYPAL' 'BITCOIN'
			this.payday= this.timestamp() //DATE TIME 2017-12-11 00:00:00 ...? I AM INJECTING DATETIME NOW, BUT LATER MUST COME FROM FRONTEND
			this.pay_frequency= json.pay_frequency//ENUM => 'NEXT_WEEK'(Default) 'SAME_WEEK' 'NEXT_MONTH' 'SAME_MONTH'
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

	module.exports = PayDetails;
}())
