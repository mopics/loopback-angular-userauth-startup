'use strict';

describe('userAuth E2E testing', function(){

    var hasClass = function (element, cls) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };

    describe( 'login', function(){
        beforeEach(function(){
            browser.get('#!/login');
        });
        it( 'should redirect to home on login success', function( done ){
            element(by.model('credentials.email')).sendKeys('mopics25@gmail.com');
            element(by.model('credentials.password')).sendKeys('GOD');
            var loginButton = element(by.id('login-button'));
            
            loginButton.click();

            // wait 2 seconds for server response, TODO: find out if there is a better way?
            setTimeout( function(){
                expect(browser.getCurrentUrl()).toMatch("#!/");
                done();
            },2000 );
        });
    });

    describe('logout', function(){
        beforeEach(function(){
            browser.get('#!/logout');
        });;
        it('should say : U bent succesvol uit gelogd', function(done){
            setTimeout( function(){
                var msg = element(by.id('logout-message')).getText();
                expect(msg).toEqual("U bent succesvol uit gelogd");
                done();
            },2000)
        })
    });
    
    describe('signup', function(){
        beforeEach(function(){
            browser.get('#!/signup');
        });
        it('should say: Deze email is al in gebruik', function(done){
            element(by.model('credentials.email')).sendKeys('mopics25@gmail.com');
            element(by.model('credentials.password')).sendKeys('GOD');
            element(by.model('credentials.password2')).sendKeys('GOD');
            var signupButton = element(by.id('signup-button'));
            
            signupButton.click();
            // wait 2 seconds for server response, TODO: find out if there is a better way?
            setTimeout( function(){
                var msg = element(by.id('signup-error')).getText();
                expect(msg).toEqual("Deze email is al in gebruik");
                done();
            },2000 );
        });
        it('should show email-send-callback div', function(done){
            element(by.model('credentials.email')).sendKeys('mopics25@outlook.com');
            element(by.model('credentials.password')).sendKeys('GOD');
            element(by.model('credentials.password2')).sendKeys('GOD');
            var signupButton = element(by.id('signup-button'));
            signupButton.click();
            // wait 2 seconds for server response, TODO: find out if there is a better way?
            setTimeout( function(){
                var emailsenddiv = element(by.id('email-send-callback'));
                // div should not have css class ng-hide
                var b = hasClass( emailsenddiv, 'ng-hide');
                var c = expect(b).toBeFalsy();
                done();
            },2000 );
        });
    });

    describe('resetpassword',function(){
        beforeEach(function(){
            browser.get('#!/resetpassword');
        });
        it('should say: Deze email is niet bij ons bekend', function(done){
            element(by.model('email')).sendKeys('m@m.nl');
            var btn = element(by.id('resetpassword-button'));
            
            btn.click();
            
            // wait 2 seconds for server response, TODO: find out if there is a better way?
            setTimeout( function(){
                var msg = element(by.id('resetpassword-error')).getText();
                expect(msg).toEqual("Deze email is niet bij ons bekend");
                done();
            },2000 );
        });
        it('should show email-send-callback div', function(done){
            element(by.model('email')).sendKeys('mopics25@gmail.com');
            
            var btn = element(by.id('resetpassword-button'));
            
            btn.click();
            // wait 2 seconds for server response, TODO: find out if there is a better way?
            setTimeout( function(){
                var emailsenddiv = element(by.id('email-send-callback'));
                // div should not have css class ng-hide
                expect(hasClass( emailsenddiv, 'ng-hide')).toBeFalsy();
                done();
            },2000 );
        });
    });

    describe('setnewpassword', function(){
        // div setnewpassword-error
        beforeEach(function(){
            browser.get('#!/setnewpassword');
        });
        it('should show setnewpassword-error div', function(done){
            element(by.model('password')).sendKeys('GOD');
            element(by.model('password2')).sendKeys('GOD');
            var btn = element(by.id('setnewpassword-button'));
            
            btn.click();
            // wait 2 seconds for server response, TODO: find out if there is a better way?
            setTimeout( function(){
                var emailsenddiv = element(by.id('setnewpassword-error'));
                // div should not have css class ng-hide
                expect(hasClass( emailsenddiv, 'ng-hide')).toBeFalsy();
                done();
            },2000 );
        });
    });
});