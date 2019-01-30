define(['jquery','fullPage',
    'chartingd3',
    './indexjs/servicesPage'], function($, fullpage,charting,servicesPage){

     
        $('#fullpage').fullpage({
        
        anchors: ['top','services','recruitment','stats','smartHRO','manage','contact'],
        menu: '#side_menu',
        afterLoad: function(link, index){
            if(link == 'contact'){
               
            }
            if(link == 'top'){
               // $('.hometitle').delay(2000).animate({opacity:'0'},2000).animate({opacity:'1'},2000);

            }
            if(link == 'services'){
                servicesPage.workersSlideIn();
                
                
            }
             if(link == 'recruitment'){
     
                servicesPage.t1b().play();
                servicesPage.t1a().play();
                servicesPage.t2().play();
                servicesPage.t3().play();
                servicesPage.t4().play();
                
            }
            if(link == 'stats'){
                charting.render();
               
                
            }
        },
        onLeave: function(index, nextIndex, direction){
            var leavingSection = $(this);

        
            if(index === 1 && (direction == 'down' || direction == 'up')){
               
            }
            if(index === 2 && (direction == 'down' || direction == 'up')){
             

            }
            if(index === 3 && (direction == 'down' || direction == 'up')){
                servicesPage.t1b().pause();
                servicesPage.t1a().pause();
                servicesPage.t2().pause();
                servicesPage.t3().pause();
                servicesPage.t4().pause();
                console.log('animations paused in recruitment');
            }
            if(index === 4 && (direction == 'down' || direction == 'up')){
              
            }
            if(index === 5 && (direction == 'down' || direction == 'up')){
                
            }
            if(index === 6 && (direction == 'down' || direction == 'up')){
              
            }
            if(index === 7 && (direction == 'down' || direction == 'up')){
            
            }
        }


    });

});

