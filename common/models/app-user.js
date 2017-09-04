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
            redirect: 'http://localhost:9000/#!/verified', // page to link to from email ?
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
};
