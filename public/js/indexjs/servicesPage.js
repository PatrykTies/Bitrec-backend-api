define(['TweenMax'],function(TweenMax){

   
    function t1b(){
    	var t1b = TweenMax.to('.rotateLeft2',66,{rotation:-360, transformOrigin:'49.25% 50.75%',ease:Linear.easeNone, repeat:-1})
    		.pause();
    	return t1b;
    }
    function t1a(){
    	var t1a = TweenMax.to('.rotateLeft',66,{rotation:-360, transformOrigin:'50.75% 49.25%',ease:Linear.easeNone, repeat:-1})
    		.pause();
    	return t1a;
    }
    function t2(){
    	var t2 = TweenMax.to('.rotateRight',56,{rotation:360, transformOrigin:'50% 50%',ease:Linear.easeNone, repeat:-1})
    		.pause();
    	return t2;
    }
    function t3(){
    	var t3 = TweenMax.to('.rotateRightFast',5,{rotation:360, transformOrigin:'50% 50%',ease:Linear.easeNone, repeat:-1})
    		.pause();
    	return t3;
    }
    function t4(){
    	var t4 = TweenMax.to('.rotateLeftFast',5,{rotation:-360, transformOrigin:'50% 50%',ease:Linear.easeNone, repeat:-1})
    		.pause();
    	return t4;
    }




    
	function workersSlideIn(){
		
		//----------------------------------------------------------------------------------------------SELECTORS FOR SVG FILES
	    var deliverySvg = document.getElementById("delivery").contentDocument,
	   	    loadingSvg = document.getElementById("loading").contentDocument,
	   	    assemblySvg = document.getElementById("assembly").contentDocument,
	   	    lineSvg = document.getElementById("line").contentDocument,
		
		//----------------------------------------------------------------------------SELECTORS FOR GROUP ELEMENTS INSIDE SVG'S	
			deliveryman = deliverySvg.getElementById("deliveryman"),
			driver = deliverySvg.getElementById("driver"),
			deliveryBck = deliverySvg.getElementById("deliveryBck"),

			loader =  loadingSvg.getElementById("loader"),
			forkliftdriver =  loadingSvg.getElementById("forkliftdriver"),

			assemblers =  assemblySvg.getElementById("assemblers"),
			tester =  assemblySvg.getElementById("tester"),
			cnc =  assemblySvg.getElementById("cnc"),

			operatives =  lineSvg.getElementById("operatives"),
			
		//-----------------------------------------------------------------ARRAYS OF SVG'S G ELEMENTS GROUPED FOR SAME ANIMATION		
			deliveryObjs = [deliveryman, driver];
			loadingObjs = [loader, forkliftdriver];
			assemblyObjs = [assemblers, tester, cnc];
			
	  
		//-----------------------------------------------------------------------------------------------------ANIMATION SETTERS
		TweenMax.set([deliveryObjs, deliveryBck], {css:{visibility:'visible', transform:'translateY(500px)'}});
		TweenMax.set(loadingObjs, {css:{visibility:'visible', transform:'translateX(500px)'}});
		TweenMax.set(assemblyObjs, {css:{visibility:'visible', transform:'translateX(500px)'}});
		TweenMax.set(operatives, {css:{visibility:'visible', transform:'translateY(500px)'}});



		TweenMax.to([loadingObjs,assemblyObjs, deliveryBck],2,{css: {transform:'translateX(0)'}});
		TweenMax.to([deliveryObjs,operatives],2,{css: {transform:'translateY(0)'}});

		
		
	}


	return {
		workersSlideIn: workersSlideIn,
		t1b:t1b,
		t1a:t1a,
		t2:t2,
		t3:t3,
		t4:t4

		
	};


 

});