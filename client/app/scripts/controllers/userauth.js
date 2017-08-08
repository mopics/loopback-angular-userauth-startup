'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:UserAuthCtrl
 * @description
 * # UserAuthCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('LoginCtrl', function($scope, $rootScope, $stateParams, User, LOCALE ){
    $scope.status = $stateParams.status;
    $scope.userRegistered = true;
    $scope.locale = LOCALE;

    $scope.credentials = {
      email:"",
      password:""
    };
    $scope.loginError = false;
    $scope.loginErrorMessage = "";

    $scope.login = function() {
      $scope.loginResult = User.login($scope.credentials,
        function(res) { 
          $rootScope.loginResult = res;
        }, function(res) {
          $scope.loginError = true;
          if( res.status===401 ){ // Unauthorized
            $scope.loginErrorMessage = ['Je gebruikersnaam en/of het wachtwoord is onjuist. Probeer het opnieuw.','Invalid email address/password combination.'][$scope.locale];
          }
          else {
            $scope.loginErrorMessage = ['Kon geen verbinding maken met de server probeer het later nog eens.', 'Could not connect to server, please try again later.'][$scope.locale];
          }
      });
    };
})
.controller('SignupCtrl', function($scope,$stateParams,User,LOCALE){
  $scope.locale = LOCALE;
  $scope.prevState = { state:'app', name:'home'};
  if($stateParams.prevState){
    $scope.prevState = {
      state:$stateParams.prevState,
      name:$stateParams.prevStateName
    };
  };

  $scope.credentials = { email:"", password:"" };
  $scope.signupError = false;
  $scope.signupErrorMessage = "";

  $scope.signup = function(){
    User.create({email: $scope.credentials.email, password: $scope.credentials.password}, function( res ) {
      console.log( res );
      // TODO: send an verification email to activate new user
      // TODO: set some sort of timer : if user does not activate new account in 3 days it will be destroyed.
    },
    function( res ){
      if( res.status===422 ) { // statusText="Unprocessable Entity", email already in use
        $scope.signupError = true;
        $scope.signupErrorMessage = ["Deze email is al in gebruik", "This email is already in use"][$scope.locale];
      }
      console.log(res.status);
    });
  }
})
.controller('ResetPasswordCtrl', function($scope,LOCALE){
  $scope.locale = LOCALE;
  $scope.emailSend = false;
  $scope.email = "";
  $scope.submitEmail = function(){
    // TODO: use Email-connector to send email?
    console.log( $scope.email );
  }
})
.controller('SetNewPasswordCtrl', function($scope, $stateParams,LOCALE){
  $scope.locale = LOCALE;
  $scope.reset_key = $stateParams.reset_key;
  // TODO check reset_key with back-end
  console.log( $scope.reset_key );
});