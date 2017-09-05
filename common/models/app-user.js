'use strict';

var config = require('../../server/config.json');
var path = require('path');
//TODO require globalization like oringal loopback user does!

module.exports = function(User) {
    //send verification email after registration
    User.afterRemote('create', function(context, user, next) {
        var options = {
            type: 'email',
            to: user.email,
            from: 'noreply@loopback.com', // our email
            subject: 'Thanks for registering.', // email title
            template: "", // no template, we are sending back a json result on user create success
            redirect: 'http://' + config.clienthost + ':' + config.clientport + '/#!/verified', // page to link to from email ?
            user: user
        }; 

        /* the User.verify method sends a verification email using the options above */
        user.verify( options, function(err, response) {
            if (err) {
                User.deleteById(user.id);
                return next(err);
            }
            context.res.json( { status:1 } );
        });
    });

    //send password reset link when requested
    User.on('resetPasswordRequest', function(info) {
        var url = 'http://' + config.clienthost + ':' + config.clientport + '/#!/setnewpassword';
        var html = 'Click <a href="' + url + '?reset_key=' +
            info.accessToken.id + '">here</a> to reset your password';

        User.app.models.Email.send(
            {
                to: info.email,
                from: info.email,
                subject: 'Password reset',
                html: html
            }, 
            function(err) {
                if (err) return console.log('> error sending password reset email');
                console.log('> sending password reset email to:', info.email);
            }
        );
    });
    // send status-ok json after password change
    User.afterRemote('changePassword', function(context, user, next) {
        context.res.json( { status:1 } );
    });

    //  send status-ok json after password reset
    User.afterRemote('setPassword', function(context, user, next) {
        context.res.json( { status:1 } );
    });
};
