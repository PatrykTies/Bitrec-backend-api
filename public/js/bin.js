function tweenText(percent) {  //------------------------------------------here percent = 42
	 	
	  var format = d3.format("%");   

	    var progress = 0;

	    var timeout = setTimeout(function () {

	      clearTimeout(timeout);
	    
	      textTween.transition().duration(500).attrTween("d", function (a) {
       
		        var i  = d3.interpolate(this._current, a);
		        var i2 = d3.interpolate(progress, percent);
		        this._current = i(0);
		        return function(t) {
		          textTween.text( format(i2(t)/100 ) );//-----------------------------------------------THIS DO THE MAGIC TRANSITION 
	        };
	      });
	    }, 200);
    }

    
	function tweenTotalWorkers(){

		
			tween1.transition().duration(5000).ease('linear')
			.attr('value', '9');

			function valueTween(){
				var interpolate = d3.scale.quantize()
								.domain([0,1])
								.range([1,2,3,4,5,6,7,8,9]);
				return function(t){
					return interpolate(t);
				};
			}
	}

	function tweenCounter(target){


		d3.timer(function(){
			var value = textTween2.attr('value');
			if(value == target) return true;
			textTween2.attr('value', ++value);
		});
	}