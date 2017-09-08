'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:UserAuthCtrl
 * @description
 * # UserAuthCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('LoginCtrl', function($scope, $rootScope, $state, $stateParams, AppUser, LOCALE, $http ){
    $scope.status = $stateParams.status;
    $scope.userRegistered = true;
    $scope.locale = LOCALE;
    $scope.serverWait = false;

    $scope.credentials = {};
    $scope.loginError = false;
    $scope.loginErrorMessage = "";

    
    function handleLoginSuccess(res){
      $rootScope.loginResult = res;
      $scope.loginResult = res;
      // redirect to ???
      $scope.serverWait = false;
      $state.go('app');
    };
    function handleLoginError(res){
      $scope.serverWait = false;
      $scope.loginError = true;
      if ( res.data === null ){
        $scope.loginErrorMessage = ['Kon geen verbinding maken met de server. Probeer het later nog eens.',
        'Could not connect to server, please try again later.'][$scope.locale];
      }
      else if ( res.data.error.code==="LOGIN_FAILED_EMAIL_NOT_VERIFIED" ) {
        $scope.loginErrorMessage = ['Aanmelden mislukt omdat uw email niet is gecontroleerd.', 
        'Login failed because your email has not been verified.'][$scope.locale];
      }
      else {
        $scope.loginErrorMessage = ['Uw gebruikersnaam en/of het wachtwoord is onjuist. Probeer het opnieuw.',
        'Invalid email address/password combination. Please try again.'][$scope.locale];
      }
    }
    $scope.testLogin = function(){
      $http({
        method: 'GET',
        url: "http://testlogin",
        data: $scope.credentials,
        headers: {'Content-Type': 'application/json'}
      }).then( handleLoginSuccess, handleLoginError );
    };
    $scope.login = function() {
      $scope.loginError = false;
      $scope.loginErrorMessage = "";
      $scope.serverWait = true;
      AppUser.login( $scope.credentials, handleLoginSuccess, handleLoginError );
    };
})
.controller('LogoutCtrl', function($scope, $rootScope, $state, AppUser, LOCALE ){
  $scope.locale = LOCALE;
  $scope.logoutMessage = ["Bezig met uitloggen ...",
  "Logging out ..."][$scope.locale];
  $scope.loggedOut = false;
  if( $rootScope.loginResult ){
    AppUser.logout( $rootScope.loginResult,
      function(res){
        $scope.logoutMessage = ["U bent succesvol uit gelogd",
        "You are successfully logged out"][$scope.locale];
        $scope.loggedOut = true;
        $rootScope.loginResult = null;
      },
      function( res ){
        $scope.logoutMessage = ["U bent succesvol uit gelogd",
        "You are successfully logged out"][$scope.locale];
        $scope.loggedOut = true;
        $rootScope.loginResult = null;
      }
    );
  }
  else {
    $scope.logoutMessage = ["U bent succesvol uit gelogd",
    "You are successfully logged out"][$scope.locale];
    $scope.loggedOut = true;
  }
})
.controller('SignupCtrl', function($scope,$stateParams,AppUser,LOCALE ){
  $scope.locale = LOCALE;
  $scope.serverWait = false;
  $scope.prevState = { state:'app', name:'home'};
  if($stateParams.prevState){
    $scope.prevState = {
      state:$stateParams.prevState,
      name:$stateParams.prevStateName
    };
  }

  $scope.credentials = { email:"", password:"" };
  $scope.signupError = false;
  $scope.signupErrorMessage = "";
  $scope.emailSend = false;

  $scope.signup = function(){
    $scope.serverWait = true;
    $scope.signupError = false;
    $scope.signupErrorMessage = "";
    AppUser.create({email: $scope.credentials.email, password: $scope.credentials.password}, 
      // SUCCESS handler
      function( res ) {
        console.log( res );
        $scope.emailSend = true;
        $scope.serverWait = false;
      },
      // ERROR handler
      function( res ){
        $scope.serverWait = false;
        $scope.signupError = true;
        if( res.status===422 ) { // statusText="Unprocessable Entity", email already in use
          $scope.signupErrorMessage = ["Deze email is al in gebruik", "Email already in use"][$scope.locale];
        }
        else {
          $scope.signupErrorMessage = ['Kon geen verbinding maken met de server. Probeer het later nog eens.',
          'Could not connect to server, please try again later.'][$scope.locale];
        }
      });
  };
})
.controller( 'VerifiedCtrl', function($scope, LOCALE){
  $scope.locale = LOCALE;
})
.controller('ResetPasswordCtrl', function( $scope, $rootScope, AppUser, LOCALE ){
  $scope.locale = LOCALE;
  $scope.emailSend = false;
  $scope.email = "";
  $scope.errorMessage = "";
  $scope.error = false;
  $scope.serverWait = false;
  $scope.submitEmail = function(){
    $scope.errorMessage = "";
    $scope.error = false;
    $scope.serverWait = true;
    // TODO: use Email-connector to send email?
    AppUser.resetPassword( { email:$scope.email }, 
      function(res){
        $scope.serverWait = false;
        $scope.error = false;
        $scope.emailSend = true;
      },
      function(res){
        $scope.serverWait = false;
        $scope.error = true;
        if( res.data ){
          $scope.errorMessage = ['Deze email is niet bij ons bekend',
          'Email not found'][$scope.locale];
        }
        else {
          $scope.errorMessage = ['Kon geen verbinding maken met de server. Probeer het later nog eens.',
          'Could not connect to server, please try again later.'][$scope.locale];
        }
      }
    );
  };
})
.controller('SetNewPasswordCtrl', function($scope, $location, $http, $state, LOOPBACK_URL, LOCALE ){
  $scope.locale = LOCALE;
  $scope.reset_key = $location.search().reset_key;

  $scope.password = "";
  $scope.password2 = "";

  $scope.error = false;
  $scope.errorMessage = "";
  $scope.serverWait = false;

  $scope.doResetPassword = function(){
    if( $scope.password !== $scope.password2 ){
      $scope.errorMessage = 'De wachtwoorden komen niet overeen.' // TODO locale
      $scope.error = true;
      $scope.passwordResetSuccess = false;
      return;
    }
    $scope.error = false;
    $scope.errorMessage = "";
    $scope.serverWait = true;
      $http({
        method: 'POST',
        url: LOOPBACK_URL+"/AppUsers/reset-password?access_token="+$scope.reset_key,
        data:"newPassword="+$scope.password,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function successCallback(res) {
        $scope.passwordResetSuccess = true;
        $scope.error = false;
        $scope.serverWait = false;
        $state.go('app.login',{status:'success_reset'});
      }, function errorCallback(res) {
        $scope.error = true;
        $scope.serverWait = false;
        if( res.data === null ){
          $scope.errorMessage = res.data.error.message;
        } else {
          $scope.errorMessage = ['Kon geen verbinding maken met de server. Probeer het later nog eens.',
          'Could not connect to server, please try again later.'][$scope.locale];
        }
      });
  };
})
.controller('ChangePasswordCtrl', function($scope, $rootScope, $state, AppUser, LOCALE ){
   $scope.locale = LOCALE;
   $scope.loginResult = $rootScope.loginResult;
   $scope.password = "";
   $scope.password2 = "";
   /*if( $scope.loginResult===undefined || $scope.loginResult===null ){
     $state.go('app.login');
   }*/
   console.log('foo');
})
;