const passport = require('../libs/passport')
const User = require('../controllers/user');

module.exports.checkAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else {
    next();
  }
}

module.exports.authorize = {
  get: (req, res) => {
    res.set('Content-Type', 'text/html');
    res.render('sign_up.pug');
  },
  post: (req, res) => {
    User
      .save({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      })
      .then(newUser => {
        console.log(newUser);
        res.redirect('/login');
      });
  }
}

module.exports.login = {
  get: (req, res) => {
    res.set('Content-Type', 'text/html');
    res.render('sign_in.pug');
  },
  post: passport.authenticate('local', { successRedirect: '/', failureRedirect: '/user' })
}

module.exports.logout = (req, res) => {
  console.log('logout', req.session);
  req.logout();
  req.session.destroy(() => {
    res.redirect('/');
  });
}
