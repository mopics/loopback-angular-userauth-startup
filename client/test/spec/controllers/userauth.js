'use strict'

describe('Controller: LoginCtrl', function(){

    // load the controller's module
    beforeEach( module('clientApp' ) );

    var LoginCtrl, scope, rootScope, $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach( inject(function($controller, _$httpBackend_,$rootScope, $state, $stateParams, AppUser, LOCALE, $http){
        // place here mocked dependencies
        $httpBackend = _$httpBackend_;
        rootScope = $rootScope;

        scope = $rootScope.$new();
        LoginCtrl = $controller('LoginCtrl', {
            $scope: scope, $rootScope:$rootScope, 
            $state:$state, $stateParams:$stateParams,
            AppUser:AppUser,LOCALE:LOCALE, $http:$http
        });

    }));

    // 
    it('should have serverWait as false', function(){
        expect(scope.serverWait).toBeFalsy();
    });
    
    it('should have loginError as false', function(){
        expect(scope.loginError).toBeFalsy();
    });

    /*
    // login result test
    it('should return loginResult', function(){
        expect(rootScope.loginResult).toBeUndefined();
        
        $httpBackend.expectPOST('http://localhost:3000/api/AppUsers/login?include=user').respond( 200, [
            {
                "id": "AcYoRBWYDsxlLEJSu1DHnEynOCCJXHSSiKTud5FH32621vVDePk8RBQlZzIvevXW",
                "ttl": 1209600,
                "created": "2017-09-06T06:54:13.498Z",
                "userId": 1
            }
        ]);
        scope.credentials = { 
            email:"mopics25@gmail.com",
            password:"GOD"
        };
        scope.login();

        $httpBackend.flush();

        expect(rootScope.loginResult).toBeDefined();
        
        
        // expect(scope.loginResult.id).toEqual(1);
    });
    */
})