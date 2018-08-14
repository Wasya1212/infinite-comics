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

function getConfirmMailOptions(req, user) {
  return {
    from: config.email.addressName,
    to: user.email,
    subject: 'Infinite comics - confirm registration',
    html: letterTemplate({
      mailType: 'confirm',
      username: user.username,
      password: user.password,
      confirmLink: `${req.protocol}://${req.get('host')}/sign-up/control?confirm=true&userId=${user.uuid}`,
      cancelLink: `${req.protocol}://${req.get('host')}/sign-up/control?confirm=false&userId=${user.uuid}`
    })
  };
}

module.exports.checkAuth = (req, res, next) => {
  console.log(req.session);
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
  post: (req, res, next) => {
    User
      .save({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      })
      .then(newUser => {
        return new Promise((resolve, reject) => {
          transporter.sendMail(getConfirmMailOptions(req, newUser), (err, info) => {
            if (err) {
              reject(err);
            }
            resolve(info);
          });
        });
      })
      .then(info => {
        console.log('Email sent: ' + info.response);
        res.redirect('/login');
      });
  },
  confirm: (req, res, next) => {
    if (req.params.confirm == false || !req.params.confirm) {
      return next();
    }

    User
      .updateById(req.params.id, { confirmed: true })
      .then(user => {
        console.log("CONFIRM:", user);
      });
  },
  cancel: (req, res, next) => {
    if (req.params.confirm == true || !req.params.confirm) {
      return next();
    }

    User
      .deleteById(req.params.id)
      .then(user => {
        console.log("DELETE:", user);
      });
  },
  restore: () => {

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
  post: passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })
}

module.exports.logout = (req, res) => {
  console.log('logout', req.session);
  req.logout();
  req.session.destroy(() => {
    res.redirect('/');
  });
}
