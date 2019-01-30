define([
  
  'app/app',
  'app/services/campaignsService',
  'app/services/positionsService',
  'app/services/jobseekerService',
  'app/services/imageService'
  
  ],function(

    app,
    campaignsService,
    positionsService,
    jobseekerService,
    ImageService
    ){


     app.controller('applyCtrl', 
        ['$scope',
         '$mdToast',
        'campaignsService',
        'positionsService',
        'jobseekerService',
        'ImageService',
        'uiGmapGoogleMapApi',
        
        function($scope, 
          $mdToast,
          campaignsService,
          positionsService,
          jobseekerService,
          ImageService,
          uiGmapGoogleMapApi
          ) {

          $scope.image = {
            originalImage: '',
            croppedImage: ''
          };
          $scope.loading = false;
          $scope.user = {};
          $scope.user.name = 'Patryk Ties';



          $scope.readFileImg = function(files) {
            $scope.user.photo = undefined;
            //FOR FACEBOOK IMG , LOAD IT HERE WITH LOGIC THAT RECOGNIZE WHERE IS IMG COMING FROM = FILESYS, FACEBOOK,LINKIN,G+
            

            if (files && files.length) {

              //THIS CONVERTS IMG TO BASE64 CODE
             ImageService.readImageFile(files[0], function(err, img) {
                if (err) {
                  var toast = $mdToast.simple()
                    .textContent('Image not saved')
                    .action('Error')
                    .highlightAction(false)
                    .position('top')
                    .theme('error-toast');
                  return $mdToast.show(toast);
                }
                
                $scope.image.originalImage = img;
                
                $scope.$apply();
                
              });

            }

          };

            $scope.upload = function() {
            if ($scope.image.croppedImage) {//works ok
               $scope.jobseeker.profilepic = $scope.image.croppedImage;//ok

              //$scope.loading = true;

             
              /*ImageService.uploadImage($scope.image.croppedImage,
                //callback
                function(user) {
                  if(user){
                    $scope.user = user;
                    var toast = $mdToast.simple()
                      .textContent('Photo saved')
                      .action('OK')
                      .highlightAction(true)
                      .position('left');
                    $mdToast.show(toast);
                  }
                  //$scope.loading = false;
                }
              );*/


             
             
            }
          };

           $scope.map = {
                center: {
                    latitude: 51.505912, 
                    longitude: -0.128382
                },
                zoom: 11,
                markers: [], // array of models to display
                componentRestrictions: {country: 'gb'},
                searchbox: { 
                    template:'searchbox.tpl.html', 
                    events:{
                      places_changed: function (searchBox) {

                       }
                     }
                    },
                options: {
                  scrollwheel: false
                }
              };

          uiGmapGoogleMapApi.then(function(maps){
            maps.visualRefresh = true;
           
          });





















          $scope.jobseeker = {};
          $scope.campaigns = [];//ARRAY OF OBJECTS campaign
          $scope.positions = [];
          

          $scope.imagePath = '../../img/mohan-face.jpg';

          $scope.loadCampaigns = function(){
           
               
         
               campaignsService.getCampaigns().then(function(response){
                  $scope.campaigns = response.data;
                   
                 });
                      
                   
             

               //return $scope.campaigns;
           
          };
          $scope.loadPositions = function(){
              
           
              positionsService.getPositions().then(function(response){
                $scope.positions = response.data;
               });
               return $scope.positions;
          };


          $scope.signup = function(){
              jobseekerService.signup($scope.jobseeker);
              
          };

          $scope.showAllCampaigns = function(){
           
          }



          var watchCampaign = $scope.$watch('jobseeker.campaign_id' , function(newValue, oldValue){
            if(newValue !== oldValue) {            
              $scope.jobseeker.campaign_id = newValue;
             // jobseekerService.campaign($scope.jobseeker.campaign_id);      //THIS IS STRING SW001LO
               //companySetter(newValue);
               angular.forEach($scope.campaigns, function(value,index){
                    //console.log(value.company_id);
                    if($scope.jobseeker.campaign_id === value.campaign_id){
                      $scope.jobseeker.company_id = value.company_id;
                    }
               });
               watchCampaign(); 
            }

          });
          
          var watchPosition = $scope.$watch('jobseeker.position_id' , function(newValue, oldValue){
            if(newValue !== oldValue) {
              $scope.jobseeker.position_id = newValue;
             // jobseekerService.position($scope.jobseeker.position_id);                
              watchPosition();
            }
          });


                

          
         

  	  }]);
});