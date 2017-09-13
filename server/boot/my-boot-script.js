module.exports = function(app) {
  var User = app.models.AppUser;
  User.create({email: 'your@email.com', password: 'GOD', emailVerified:true}, function(err, userInstance) {
    console.log(userInstance); 
  });
  var Email = app.models.Email;

  /*Email.send({
      to: 'peter@mopics.nl',
      from: 'mopics25@gmail.com',
      subject: 'my subject',
      text: 'my text',
      html: 'my <em>html piss on yer head!!</em>'
    }, function(mail) {
      console.log('email sent!');
    },
    function(res){
      console.log( "Email Error:"+ res.status+" "+res.statusText );
    }
  );*/
}