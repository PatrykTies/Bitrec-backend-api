define(["app/app","app/services/campaignsService","app/services/positionsService","app/services/jobseekerService"],function(e,i,n,o){e.controller("applyCtrl",["$scope","campaignsService","positionsService","jobseekerService",function(e,i,n,o){e.jobseeker={},e.imagePath="../../img/mohan-face.jpg",e.$watch("jobseeker.campaign_id",function(i,n){i&&o.campaign(e.jobseeker.campaign_id)},!0),e.$watch("jobseeker.position_id",function(i,n){i&&o.position(e.jobseeker.position_id)},!0),e.loadCampaigns=function(){return e.campaigns=[],i.getCampaigns().then(function(i){e.campaigns=i.data})},e.loadPositions=function(){return e.positions=[],n.getPositions().then(function(i){e.positions=i.data})},e.signup=function(){o.signup(e.jobseeker)}}])});