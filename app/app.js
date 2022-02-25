var myNinjaApp = angular.module('myNinjaApp', ['ngRoute','ngAnimate']);


myNinjaApp.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
    // $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/home',{
            templateUrl: 'views/home.html',
            controller: 'NinjaController'
        }).when('/directory',{
            templateUrl:'views/directory.html',
            controller: 'NinjaController'
        }).when('/contact',{
            templateUrl:'views/contact.html',
            controller:'ContactController'
        }).when('/contact-success',{
            templateUrl:'views/contact-success.html',
            controller:'ContactController'
        })

        .otherwise({
            redirectTo:'/home'
        });
}]);

myNinjaApp.directive('randomNinja', [function(){

    return{
        restrict: 'E',
        scope:{
            ninjas: '=',
            title: '='
        },
        templateUrl:'views/random.html',
        transclude: true, //allows more html to be between the directive tags, will be placed in the ng-include tag on the template
           replace: true, //replaces tag name with outter name for more html happiness
        controller: function($scope){
            $scope.random = Math.floor(Math.random() *5);

        }
    };
}]);

myNinjaApp.controller('NinjaController',['$scope', '$http', function($scope, $http){

    $scope.removeNinja = function(ninja){

        var removedNinja = $scope.ninjas.indexOf(ninja);
        $scope.ninjas.splice(removedNinja, 1);
    };
    //$scope.ninjaAvailable = function(ninja){
    //   //make work  
    //    var ninjaAvailableTog = $scope.ninjas.indexOf(ninja);
    //    $scope.ninjas.available = (ninjaAvailableTog.available = true) ? 
    //    ninjaAvailableTog.available = false :
    //    ninjaAvailableTog.available = true;
    //};
    $scope.addNinja = function(){
        $scope.ninjas.push({
            name: $scope.newninja.name,
            belt: $scope.newninja.belt,
            rate: parseInt($scope.newninja.rate),
            available:true
        });

        $scope.newninja.name="";
        $scope.newninja.belt="";
        $scope.newninja.rate="";

    };
    $scope.removeAll = function(){
        $scope.ninjas = [];
    }

    $http.get('./data/ninjas.json').then(function(data){
        $scope.ninjas = data.data;
    });

}]);

myNinjaApp.controller('ContactController', ['$scope','$location', function($scope, $location){

    $scope.sendMessage = function(){
        $location.path('/contact-success');
    }

}]);