module.exports = function(app) {
  var User = app.models.AppUser;
  User.create({email: 'your@email.com', password: 'GOD', emailVerified:true}, function(err, userInstance) {
    console.log(userInstance); 
  });
  var Email = app.models.Email;

}