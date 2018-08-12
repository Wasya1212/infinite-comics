const passport = require('../libs/passport')
const User = require('../controllers/user');
const config = require('../config/default');
const nodemailer = require('nodemailer');
const pug = require('pug');

const letterTemplatePath = config.email.template.fullPath;
const letterTemplateOptions = {
  basedir: config.email.template.foulderPath
};

let letterTemplate = pug.compileFile(letterTemplatePath, letterTemplateOptions);

let transporter = nodemailer.createTransport({
  service: config.email.serviceName,
  auth: {
    user: config.email.username,
    pass: config.email.password
  },
  tls: { rejectUnauthorized: false },
  pool: true
});

transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});

let mailOptions = {
  from: config.email.addressName,
  to: 'wasya1212cool@gmail.com',
  subject: 'Infinite comics - configm registration',
  html: letterTemplate({
    mailType: 'confirm',
    username: 'admin',
    password: 'root',
    confirmLink: 'https://google.com'
  })
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

module.exports.checkAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log("CHECK AUTH FALSE");
    res.redirect('/login');
  } else {
    console.log("CHECK AUTH TRUE");
    next();
  }
}

module.exports.authorize = {
  get: (req, res) => {
    res.set('Content-Type', 'text/html');
    res.render('sign_up.pug', {
      user: req.user
    });
  },
  post: (req, res) => {
    User
      .save({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      })
      .then(newUser => {
        res.redirect('/login');
      });
  }
}

module.exports.login = {
  get: (req, res) => {
    res.set('Content-Type', 'text/html');
    console.log(req.headers);
    res.render('sign_in.pug', {
      user: req.user
    });
  },
  post: function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        console.log("USER IS AUTHENTICATED");
        return res.redirect('/');
      });
    })(req, res, next);
  }
  // post: passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })
}

module.exports.logout = (req, res) => {
  console.log('logout', req.session);
  req.logout();
  req.session.destroy(() => {
    res.redirect('/');
  });
}
