// Generated by CoffeeScript 1.7.1
(function() {
  var UserFactory, config, moment;

  UserFactory = require('../modules/userFactory');

  moment = require('moment');

  config = require('cnf');

  module.exports = function(role) {
    return function(req, res, next) {
      var end, isAuth, start, user, userRole, _ref;
      res.viewData = res.viewData || {};
      res.viewData.moment = moment;
      start = moment(config.startDate, "YYYY-MM-DD HH-mm");
      end = moment(config.endDate, "YYYY-MM-DD HH-mm");
      res.viewData.toStart = start.diff(moment());
      res.viewData.toEnd = end.diff(moment());
      res.viewData.hasStarted = start.diff(moment()) < 0;
      res.viewData.hasEnded = end.diff(moment) < 0;
      res.viewData.formatDate = function(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
      };
      isAuth = req.isAuthenticated();
      res.viewData.isAuth = isAuth;
      user = req.user || {};
      user.isAdmin = isAuth && req.user.role === 'admin';
      if (isAuth) {
        UserFactory(user).getInfo();
      }
      userRole = (_ref = req.user) != null ? _ref.role : void 0;
      res.viewData.user = user;
      if (isAuth && role === 'any') {
        return next();
      }
      if (user.isAdmin || role === void 0) {
        return next();
      }
      if (userRole !== role) {
        return res.redirect('/');
      }
      return next();
    };
  };

}).call(this);

//# sourceMappingURL=authorizeRole.map
