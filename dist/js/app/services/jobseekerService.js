define(["app/app"],function(n){"use strict";n.factory("jobseekerService",["$http",function(n){var o={};return o.signup=function(o){var i=new FormData;for(var e in o)i.append(e,o[e]);n.post("/api/signup",i,{transformRequest:angular.identity,headers:{"Content-Type":void 0}})},o.campaign=function(o){n.post("/api/setcampaign",{campaign:o}).success(function(n,o,i){console.log(n)}).error(function(n,o,i){console.log("failure message from Angular POST: "+JSON.stringify({data:n}))})},o.position=function(o){n.post("/api/setposition",{position:o}).success(function(n,o,i){console.log(n)}).error(function(n,o,i){console.log("failure message from Angular POST: "+JSON.stringify({data:n}))})},o}])});