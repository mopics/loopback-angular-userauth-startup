'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:UserAuthCtrl
 * @description
 * # UserAuthCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('LoginCtrl', function($scope, $rootScope, $state, $stateParams, AppUser, LOCALE ){
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
      $scope.loginResult = AppUser.login($scope.credentials,
        function(res) { 
          if( !res.user.emailVerified ){
            $scope.loginErrorMessage = ['Je hebt je email nog niet geverifieerd.',
            "You haven't verified your email."][$scope.locale];
          }
          else{
            $rootScope.loginResult = res;
            // redirect to ???
            $state.go('app');
          }
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
.controller('LogoutCtrl', function($scope, $rootScope, $state, AppUser, LOCALE){
  $scope.locale = LOCALE;
  $scope.logoutMessage = ["Bezig met uitloggen ...",
  "Logging out ..."][$scope.locale];
  $scope.loggedOut = false;
  if( $rootScope.loginResult ){
    AppUser.logout( $rootScope.loginResult,
      function(res){
        $scope.logoutMessage = ["U bent succesvol uit gelogd!",
        "You are successfully logged out."][$scope.locale];
        $scope.loggedOut = true;
        $rootScope.loginResult = null;
      },
      function( res ){
        $scope.logoutMessage = ["U bent succesvol uit gelogd!",
        "You are successfully logged out."][$scope.locale];
        $scope.loggedOut = true;
        $rootScope.loginResult = null;
      }
    );
  }
  else {
    $scope.logoutMessage = ["U bent succesvol uit gelogd!",
    "You are successfully logged out."][$scope.locale];
    $scope.loggedOut = true;
  }
})
.controller('SignupCtrl', function($scope,$stateParams,AppUser,LOCALE){
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
  $scope.emailSend = false;

  $scope.signup = function(){
    AppUser.create({email: $scope.credentials.email, password: $scope.credentials.password}, 
      // SUCCESS handler
      function( res ) {
        console.log( res );
        $scope.emailSend = true;
      },
      // ERROR handler
      function( res ){
        if( res.status===422 ) { // statusText="Unprocessable Entity", email already in use
          $scope.signupError = true;
          $scope.signupErrorMessage = ["Deze email is al in gebruik", "This email is already in use"][$scope.locale];
        }
        console.log(res.status);
      });
  }
})
.controller( 'VerifiedCtrl', function($scope, LOCALE){
  $scope.locale = LOCALE;
} )
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