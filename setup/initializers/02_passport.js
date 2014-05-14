// Generated by CoffeeScript 1.7.1
(function() {
  var User, VKontakteStrategy, config, mongoose, passport;

  passport = require('passport');

  VKontakteStrategy = require('passport-vkontakte').Strategy;

  mongoose = require('mongoose');

  User = mongoose.model('user');

  config = require('cnf');

  module.exports = function(done) {
    passport.use(new VKontakteStrategy({
      clientID: config.vk.appId,
      clientSecret: config.vk.appSecret,
      callbackURL: config.http.siteUrl + "auth/vkontakte/callback"
    }, function(accessToken, refreshToken, profile, callback) {
      return User.findOne({
        vkontakteId: profile.id
      }, function(err, user) {
        var newUser;
        if (user || err) {
          return callback(err, user);
        }
        newUser = new User({
          vkontakteId: profile.id,
          profile: profile
        });
        return newUser.save(function(err) {
          return callback(err, newUser);
        });
      });
    }));
    passport.serializeUser(function(user, done) {
      return done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
      return User.findById(id, function(err, user) {
        return done(err, user);
      });
    });
    return done();
  };

}).call(this);

//# sourceMappingURL=02_passport.map
