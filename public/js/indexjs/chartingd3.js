
define(['jquery', 'd3'],function($, d3){
	
  
   
    var width = 500,
    height = 300,
    radius = Math.min(width, height) / 2,
    numbersHeight = 290,
    numbersWidth = 290,
    innerRadius = 80,
    outerRadius = 140,
    numbersAngle = 2 * Math.PI,
    trans_white = 'rgba(255, 255, 255, 0.5)',
    fyllyTrans_white = 'rgba(255, 255, 255, 0.1)',
    colors = [trans_white,trans_white,trans_white,trans_white,trans_white,trans_white,trans_white];
    
   
    var svg2 = d3.select("#chart2").append("svg")
            .attr("class", "pie")
            .attr("height", height)
            .attr("width", width);




    var svg = d3.select("#chart1").append("svg")
        .attr("class", "pie")
        .attr("height", height)
        .attr("width", width)
        .append('g');

        svg.append("g")
            .attr("class", "arcs");
        svg.append("g")
            .attr("class", "labels");
        svg.append("g")
            .attr("class", "lines");
        




    var svg3 = d3.select("#chart3").append("svg")
            .attr("class", "pie")
            .attr("height", height)
            .attr("width", width);

    var textTween = d3.select('#tween4').append('svg').attr("class", "countdown")
                    .attr("height", numbersHeight)
                   .attr("width", numbersWidth)
                   .attr("transform", 'translate(0,100)')
                   .append("text").attr('value','0').style('fill','white');

	var textTween3 = d3.select('#tween3').append('svg').attr("class", "countdown")
                    .attr("height", numbersHeight)
                   .attr("width", numbersWidth)
                   .attr("transform", 'translate(0,100)')
                   .append("text").attr('value','0').style('fill','white');
               
   
                   
   var textTween5 = d3.select('#tween5').append('svg').attr("class", "countdown")
                    .attr("height", numbersHeight)
                   .attr("width", numbersWidth )
                   .attr("transform", 'translate(0,100)')
                   .append("text").attr('value','0').style('fill','white');

    function render(){

    	renderFirst(innerRadius,outerRadius);
    	renderEthnic(innerRadius,outerRadius);
    	renderPositions(innerRadius,outerRadius);
    	tweenWorkers(textTween, 500, 0);

    }

    


	function renderLabels(elem,yourPie,newArc){

            	var cssToDataKey = function(d){return "label-" + d.data.qty;};
        
            	labels = elem.selectAll('text').data(yourPie);
            	labels.enter()
            			.append('text').attr('class', cssToDataKey)
            			.style('fill','#FDFCEA')
            			.style('font-size','24px')
            			.style('font-weight','700')
            			//.style('stroke','white')
            			.style('opacity','0');
    			labels.transition()
    				.attr('transform', function(d){
    				
    					return 'translate(' + newArc.centroid(d) + ')';
    				})
    				.attr('dy','.35em')
    				.attr('text-anchor','middle')
    				.text(function(d){
    					return d.data.qty;
    				});
				labels.transition().delay(1000).duration(1000).style('opacity','1');

			

    }

	function renderPercentLabels(elem,yourPie,newArc){

            	var cssToDataKey = function(d){return "label-" + d.data.qty;};
            	var format = d3.format("%");

            	labels = elem.selectAll('text').data(yourPie);
            	labels.enter()
            			.append('text').attr('class', cssToDataKey)
            			.style('fill','#FDFCEA')
            			.style('font-size','24px')
            			.style('font-weight','700')
            			//.style('stroke','white')
            			.style('opacity','0');
    			labels.transition()
    				.attr('transform', function(d){
    				
    					return 'translate(' + newArc.centroid(d) + ')';
    				})
    				.attr('dy','.35em')
    				.attr('text-anchor','middle')
    				.text(function(d){
    					return format(d.data.qty/100);
    				});
				labels.transition().delay(1000).duration(1000).style('opacity','1');

			

    }


    
    

	 function renderFirst(innerRadius, outerRadius) {
			
		
	  d3.json("js/data/ethnic.json", function(data){

	  		//svg.select("#chart1 g").remove();

			var pieChart = d3.layout.pie().sort(null).value(function(data){return data.qty; });
			var yourPie = pieChart(data);
			var newArc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);
			var arc = d3.svg.arc()
							.outerRadius(radius * 0.85)
							.innerRadius(radius * 0.80);
			var outerArc = d3.svg.arc()
							.innerRadius(radius * 0.9)
							.outerRadius(radius * 0.9);

			var key = function(data){ return data.data.nationality; };


			svg.attr("transform", "translate(" + width / 2 + "," + height/2 + ")");
			svg.append('text').attr('x',0).attr('y',8).style('text-anchor','middle').text('Lorem isd dds');
			

			var pie = svg.select(".arcs");
					 

			pie.selectAll('path.arc')
				.data(yourPie,key)
				.enter()
			.append('path')
			.attr("class", "arc")
			.attr("fill", function (d, i) {
	                return colors[i];
	            })
	            .style('stroke','white')
	            .style('stroke-width','1')
             .transition().ease('bounce').duration(1500)
	            .attrTween("d", function (d) { 
	                var start = {startAngle: 0, endAngle: 0}; // <-A
	                var interpolate = d3.interpolate(start, d); // <-B
	                return function (t) {
	                    return newArc(interpolate(t)); // <-C
	                };
	         });

            pie.selectAll('path.arc')
            	.on('mouseover', function(data){
            		var self = d3.select(this);
            		self.style('fill','white');
            		d3.select('.label-' + data.data.qty).style('fill','black');
            	
            	})
            	.on('mouseout', function(data){
            		d3.select(this).style('fill',trans_white); 
          			d3.select('.label-' + data.data.qty).style('fill','#FDFCEA');
            	});

			
            renderPercentLabels(pie,yourPie,newArc);

            /* ------- TEXT LABELS -------*/
            
			var text = svg.select(".labels").selectAll("text")
				.data(yourPie, key);

			text.enter()
				.append("text")
				.attr("dy", ".35em")
				.text(function(d) {
					return d.data.nationality;
				});
			
			function midAngle(d){
				return d.startAngle + (d.endAngle - d.startAngle)/2;
			}

			text.transition().duration(1000)
				.attrTween("transform", function(d) {
					this._current = this._current || d;
					var interpolate = d3.interpolate(this._current, d);
					this._current = interpolate(0);
					return function(t) {
						var d2 = interpolate(t);
						var pos = outerArc.centroid(d2);
						pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
						return "translate("+ pos +")";
					};
				})
				.styleTween("text-anchor", function(d){
					this._current = this._current || d;
					var interpolate = d3.interpolate(this._current, d);
					this._current = interpolate(0);
					return function(t) {
						var d2 = interpolate(t);
						return midAngle(d2) < Math.PI ? "start":"end";
					};
				});

			text.exit()
				.remove();
			/* ------- SLICE TO TEXT POLYLINES -------*/

			var polyline = svg.select(".lines").selectAll("polyline")
				.data(yourPie, key);
			
			polyline.enter()
				.append("polyline");

			polyline.style('stroke','white').style('stroke-width','2px').style('opacity','.9').style('fill','none');

			polyline.transition().duration(1000)
				.attrTween("points", function(d){
					this._current = this._current || d;
					var interpolate = d3.interpolate(this._current, d);
					this._current = interpolate(0);
					return function(t) {
						var d2 = interpolate(t);
						var startingPoint = arc.centroid(d2);				
						var pos = outerArc.centroid(d2);
						pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
						return [startingPoint, outerArc.centroid(d2), pos];
					};			
				});
			
			polyline.exit()
				.remove();

         	
		});
	}
		
	

	function renderEthnic(innerRadius, outerRadius){

		
		d3.json("js/data/ethnic.json", function(data){

			svg2.select("#chart2 g").remove();

			var pieChart = d3.layout.pie().value(function(data){return data.qty; });
			var yourPie = pieChart(data);
			var newArc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);

			

			
			var pie2 = svg2.append('g')
			.attr('transform','translate(260,160)');

			pie2.selectAll('path.arc')
				.data(yourPie)
				.enter()
			.append('path')
			.attr("class", "arc")
			.attr("fill", function (d, i) {
	                return colors[i];
	            })
	            .style('stroke','white')
	            .style('stroke-width','1')
             .transition().ease('bounce').duration(2000)
	            .attrTween("d", function (d) { 
	                var start = {startAngle: 0, endAngle: 0}; // <-A
	                var interpolate = d3.interpolate(start, d); // <-B
	                return function (t) {
	                    return newArc(interpolate(t)); // <-C
	                };
	            });
             pie2.selectAll('path.arc')
            	.on('mouseover', function(data){
            		var self = d3.select(this);
            		self.style('fill','white');
            		d3.select('.label-' + data.data.qty).style('fill','black');
            	
            	})
            	.on('mouseout', function(data){
            		d3.select(this).style('fill',trans_white); 
          			d3.select('.label-' + data.data.qty).style('fill','#FDFCEA');
            	});

            renderLabels(pie2, yourPie,newArc);    	
			
		});

	}

	function renderPositions(innerRadius, outerRadius){

		
		d3.json("js/data/positions.json", function(data){

			svg3.select("#chart3 g").remove();

			var pieChart = d3.layout.pie().value(function(data){return data.qty; });
			var yourPie = pieChart(data);
			var newArc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);

		
			var pie3 = svg3.append('g')
			.attr('transform','translate(260,140)');

			pie3.selectAll('path')
				.data(yourPie)
				.enter()
			.append('path')
			.attr("class", "arc")
			.attr("fill", function (d, i) {
	                return colors[i];
	            })
	            .style('stroke','white')
	            .style('stroke-width','1')
             .transition().ease('bounce').duration(2500)
	            .attrTween("d", function (d) { 
	                var start = {startAngle: 0, endAngle: 0}; // <-A
	                var interpolate = d3.interpolate(start, d); // <-B
	                return function (t) {
	                    return newArc(interpolate(t)); // <-C
	                };
	            });

             pie3.selectAll('path.arc')
            	.on('mouseover', function(data){
            		var self = d3.select(this);
            		self.style('fill','white');
            		d3.select('.label-' + data.data.qty).style('fill','black');
            	
            	})
            	.on('mouseout', function(data){
            		d3.select(this).style('fill',trans_white); 
          			d3.select('.label-' + data.data.qty).style('fill','#FDFCEA');
            	});

        	 renderLabels(pie3, yourPie,newArc);

		});

	}


	function tweenWorkers(element,delay,i){
	
		d3.json("js/data/workers.json", function(error, data){
			if(error) throw error;
			
			var target = data[i].qty;		

			function tweener(){
				var value = element.attr('value'); //THIS MUST STAY AS 0 BEGINING
				if(value == target) return true;  //TARGET SHOULD BE QTY - FINAL INT => SO DATA COMES HERE ONLY
				element.attr('value', ++value).text(value); //THIS CAN STAY AS IT IS
			}

			d3.timer(tweener,delay);
		});
		
	}

	

  return {

  	render:render

  };	
}); // end of jQuery name space

