'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'lbServices',
  ])
  .constant('LOCALE', 0 ) // 0=nl, 1=en
  .constant('LOOPBACK_URL', "http://localhost:3000/api")
  .config(function ( $stateProvider, $urlRouterProvider, LoopBackResourceProvider ) {
    LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');
    $stateProvider
      .state('app', { // route of home page
        url:'/',
        views: {
          'header':{
            templateUrl:'views/header.html',
            controller:'HeaderCtrl'
          },
          'content':{
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
          },
          'footer':{templateUrl:'views/footer.html'}
        }
      })
      .state('app.about', {
        url:'about',
        views:{
          'content@':{ 
            templateUrl:'views/about.html',
            controller:'AboutCtrl'
          }
        }
      })
      .state('app.login', {
        url:'login',
        params:{ status:null},
        views:{
          'content@':{
            templateUrl:'views/userauth/login.html',
            controller:'LoginCtrl'
          }
        }
      })
      .state('app.logout',{
        url:'logout',
        views:{
          'content@':{
            templateUrl:'views/userauth/logout.html',
            controller:'LogoutCtrl'
          }
        }
      })
      .state('app.signup', {
        url:'signup',
        params:{ prevState:null, prevStateName:null},
        views:{
          'content@':{
            templateUrl:'views/userauth/signup.html',
            controller:'SignupCtrl'
          }
        }
      })
      .state('app.verified', {
        url:'verified',
        views:{
          'content@':{
            templateUrl:'views/userauth/verified.html',
            controller:'VerifiedCtrl'
          }
        }
      })
      .state('app.resetpassword', {
        url:'resetpassword',
        views:{
          'content@':{
            templateUrl:'views/userauth/resetpassword.html',
            controller:'ResetPasswordCtrl'
          }
        }
      })
      .state('app.setnewpassword', {
        url:'setnewpassword',
        params:{ reset_key:null },
        views:{
          'content@':{
            templateUrl:'views/userauth/setnewpassword.html',
            controller:'SetNewPasswordCtrl'
          }
        }
      })
      .state('app.changepassword', {
        url:'changepassword',
        views:{
          'content@':{
            templateUrl:'views/userauth/changepassword.html',
            controller:'ChangePasswordCtrl'
          }
        }
      });
      $urlRouterProvider.otherwise('/');
  });
