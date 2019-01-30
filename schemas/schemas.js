
/*
	TO DO
	1.ADD JOBSEEKER SCHEMA
	2. CAMPAIGN CREATE SCHEMA
*/
schemas = {
    admin: {
    	 type: "object",
         properties: {
    		    email: {
    		      type: "string",
    		      pattern: "^[\\w._-]+[+]?[\\w._-]+@[\\w.-]+\\.[a-zA-Z]{2,6}$",
    		      minLength: 5,
    		      maxLength: 50
    		    },
    		    password: {
    		      type: "string",
    		      pattern: "^[A-Za-z0-9]{3,10}$",
    		      maxLength: 10,
    		      minLength: 3
    		    }
         },
         required:["email","password"]
   },
   campaign: {
      type: "object",
        properties: {
           campaign_name:{
             type: "string",
   		       maxLength: 100
           },
           job_description: {
             type: "string",
   		       maxLength: 1000
           },
           job_type: {
             enum: ['FULL_TIME', 'PART_TIME', 'TEMPORARY','CONTRACT']
           },
           salary_type: {
             enum: ['PER_ANNUM', 'PER_WEEK', 'PER_DAY','PER_HOUR']
           },
           salary: {
             type: "string",
   		       maxLength: 10
           },
           lat: {
             type: "string",
   		       maxLength: 160
           },
           lng: {
             type: "string",
   		       maxLength: 160
           },
           location: {
             type: "string",
             maxLength: 60,
             //minLength: 3
           },
           company_id: {
   		      type: "integer",
   		      minimum:1
          },
           job_id: {
             type: "integer",
             minimum:1
           },
        },
        required:["campaign_name","company_id","job_id"]
  },
   jobseeker_password: {
    	 type: "object",
         properties: {
		    email: {
		      type: "string",
		      pattern: "^[\\w._-]+[+]?[\\w._-]+@[\\w.-]+\\.[a-zA-Z]{2,6}$",
		      minLength: 5,
		      maxLength: 50
		    },
		    password: {
		      type: "string",
		      pattern: "^[A-Za-z0-9]{3,10}$",
		      maxLength: 10,
		      minLength: 3
		    },
		    jobseeker_id: {
		      type: "string",
		      pattern: "^[0-9]{2,}$",
		    }
         },
         required:["email","password"]
   },
   jobseeker:{
         properties: {
		    first_name: {
		      type: "string",
		      pattern: "^[A-Za-z-]{2,}$",
		      minLength: 2,
		      maxLength: 15
		    },
		    last_name: {
		      type: "string",
		      pattern: "^[A-Za-z']{2,}$",
		      minLength: 2,
		      maxLength: 25
		    },
		    age: {
		      type: "string",
		      minLength:2,
		    },
		    email_id: {
		      type: "string",
		      pattern: "^[\\w._-]+[+]?[\\w._-]+@[\\w.-]+\\.[a-zA-Z]{2,6}$",
		      minLength: 5,
		      maxLength: 50
		    },
		    nationality: {
		      type: "string",
		      minLength: 2,
		      maxLength: 15
		    },
		    contact_no: {
		      type: "string",
		      pattern: "^[0]+[0-9]{10}$"

		    },
		    postal_code: {
		      type: "string",
		      //"pattern": "^(GIR 0AA)|((([A-Z-[QVX]][0-9][0-9]?)|(([A-Z-[QVX]][A-Z-[IJZ]][0-9‌​][0-9]?)|(([A-Z-[QVX‌​]][0-9][A-HJKSTUW])|‌​([A-Z-[QVX]][A-Z-[IJ‌​Z]][0-9][ABEHMNPRVWX‌​Y]))))\s?[0-9][A-Z-[‌​CIKMOV]]{2})$",
		      pattern:"^([A-Za-z]{1,2}[0-9]{1,2}[A-Za-z]?[ ]?)([0-9]{1}[A-Za-z]{2})$",
		      minLength: 5,
		      maxLength: 8
		    },
		    intro_txt: {
		      type: "string",
		      maxLength: 200
		    },
		    employement_status: {
		      type: "integer",
		     // minimum:1,
		      maximum:4

		    },
		    when_to_start_work: {
		      enum: ['CAN_START_TOMORR', 'CAN_START_DAYAFTER', 'CAN_START_NEXTWEEK','CAN_START_INTWOWEEKS']
		    },
		    worked_before: {
		      type: "integer",
		     // minimum:1,
		      maximum:2

		    },
		    english_level: {
		      type: "integer",
		     // minimum:1,
		      maximum:3

		    },
  	    required: ["first_name","last_name","email_id","contact_no","postal_code"]
      },

	}
}

module.exports = schemas;
