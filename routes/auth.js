const passport = require('../libs/passport')

module.exports.checkAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else {
    next();
  }
}

module.exports.authorize = {
  get: (req, res) => {

  },
  post: (req, res) => {

  }
}

module.exports.login = {
  get: (req, res) => {
    res.set('Content-Type', 'text/html');
    res.render('create_user.pug');
  },
  post: (req, res) => {

  }
}

module.exports.logout = (req, res) => {
  console.log('logout', req.session);
  req.logout();
  req.session.destroy(() => {
    res.redirect('/');
  });
}
