(function(){

	'use strict'

	class Address {

		constructor(json){
			this.house_no= json.house_no || ''//string
      this.flat_no=json.flat_no || ''//string
			this.address_road1= json.address_road1//string
			this.address_road2= json.address_road2 || ''//string
      this.address_road3= json.address_road3 || ''//string
			this.town= this.town //string
			this.county= json.county || ''//string
		}

  }

	module.exports = Address;
}())
