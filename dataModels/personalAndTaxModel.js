(function(){

	'use strict'

	class PersonalTaxData {

		constructor(json){
			this.dob= json.dob//date yyyy-mm-dd
      this.ni_number=json.ni_number || ''//string min-max 9 characters
			this.p45_url= this.p45_url || '' //I WILL INJECT HERE CLOUD URL TO UPLOADED FILE
		}

  }

	module.exports = PersonalTaxData;
}())
