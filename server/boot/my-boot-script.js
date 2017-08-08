module.exports = function(app) {
  var User = app.models.User;
  User.create({email: 'peter@mopics.nl', password: 'GOD'}, function(err, userInstance) {
    console.log(userInstance);
  });
}