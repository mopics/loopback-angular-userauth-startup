'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:UserAuthCtrl
 * @description
 * # UserAuthCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('LoginCtrl',['$scope', '$rootScope', '$stateParams', 'User', 
                function($scope, $rootScope, $stateParams, User ){
    $scope.status = $stateParams.status;
    $scope.userRegistered = true;
    $scope.locale = {
      'nl':{
        'username':'gebruikersnaam',
        'password':'wachtwoord',
        'email':'email adres',
        'not-registered':'nog niet geregistreerd?',
        'already-registered':'al geregistreerd?',
        'create-account':'creëer een account',
        'log-in':'log in'
      }
    };
    $scope.credentials = {
      email:"",
      password:""
    };

    $scope.login = function() {
      $scope.loginResult = User.login($scope.credentials,
        function(res) { 
          $rootScope.loginResult = res;
        }, function(res) {
          if( res.status===401 ){ // Unauthorized
            console.log("Login Error: "+res.status+" "+ res.statusText );
          }
      });
    };
}])
.controller('SignupCtrl',['$scope','$stateParams', function($scope,$stateParams){
  $scope.prevState = {
    state:$stateParams.prevState,
    name:$stateParams.prevStateName
  };
}])
.controller('ResetPasswordCtrl', ['$scope', function($scope){
  $scope.emailSend = true;
}])
.controller('SetNewPasswordCtrl', ['$scope', '$stateParams', function($scope, $stateParams){
  $scope.reset_key = $stateParams.reset_key;
  // TODO check reset_key with back-end
  console.log( $scope.reset_key );
}])