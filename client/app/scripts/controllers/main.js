'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })
  .controller('HeaderCtrl', function( $scope, $rootScope, AppUser ){
    $scope.loginResult = null;
    $rootScope.$watch("loginResult", function() {
      if( $rootScope.loginResult ){
        $scope.loginResult = $rootScope.loginResult;
      }
      else {
        $scope.loginResult = null;
      }
      
    });

  });
