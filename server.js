const express = require('express');
const path = require('path');
const multiparty = require('multiparty');
const util = require('util');
const fs = require('fs');
const bodyParser = require('body-parser');
const Busboy = require('busboy');
const cloudinary = require('cloudinary');
const passport = require('./middleware/passport');
const session = require('express-session');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;

cloudinary.config({
  cloud_name: 'dtquxmxcs',
  api_key: '219447449487377',
  api_secret: 'YsATAdSo0HSkKKu1Xhp9n4bV3js'
});

let stream = cloudinary.v2.uploader.upload_stream(function(error, result){console.log(result)});

// const Sequelize = require('sequelize');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const sequelize = new Sequelize('user271351_infinite_comics', 'user271351', 'tfp7cRRoug4D', {
//   host: '46.21.250.90',
//   dialect: 'mysql',
//   operatorsAliases: Sequelize.Op,
//   pool: {
//     max: 10,
//     min: 0,
//     idle: 100000
//   }
// });

// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('user271351_infinite_comics', 'user271351', 'tfp7cRRoug4D', {
//   host: '46.21.250.90',
//   dialect: 'mysql',
//   operatorsAliases: Sequelize.Op,
//   pool: {
//     max: 10,
//     min: 0,
//     idle: 100000
//   }
// });

// let Comics = sequelize.define('comics', {
//   title: {
//     type: Sequelize.STRING,
//     field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
//   },
//   description: {
//     type: Sequelize.STRING
//   }
// }, {
//   freezeTableName: true // Model tableName will be the same as the model name
// });

// Comics.sync({force: true}).then(function () {
//   // Table created
//   return Comics.create({
//     title: 'marvel',
//     lastName: 'some desc'
//   });
// });

// const UserModel = require('./models/user')(sequelize);
//
// UserModel.sync({force: false}).then(() => {
//   UserModel.create({
//     username: "some user 234-" + Date.now(),
//     password: "some password"
//   })
//   .then(user => {
//     // console.log(user);
//   })
//   .catch(err => {
//     console.error(err);
//   });
// });

// UserModel.findOne({
//   where: {username: 'some user 234-1529240872288'}
// })
// .then(user => {
//   console.log(user);
//   UserModel.validPassword('some password', '$2b$12$C9TNZh6Dz7BggKLtouuJeuR0HNllE.AKczbYk7NBPS1g3t90oP9LC')
//   .then(isMatch => {
//     console.log(isMatch);
//   });
// });

// const User = require('./controllers/index')(poolConnection).User;
// const Image = require('./controllers/index')(poolConnection).Image;
//
// let newImage = new Image({
//   url: 'url',
//   size: 12,
//   originalName: 'original name',
//   name: 'name-' + Date.now(),
//   fullName: 'full name-' + Date.now(),
//   width: 20,
//   height: 20,
//   type: 'image',
//   modifyDate: 'some date',
//   author: 'hz',
//   format: 'jpg'
// });
//
// newImage.save()
//   .then(result => {
//     console.log("Image created!");
//     console.log(result);
//   })
//   .catch(console.error);
//
// let newUser = new User({
//   username: 'somename',
//   nickname: 'nickanme2',
//   email: 'email2',
//   password: 'password'
// });
//
// newUser.save()
//   .then(result => {
//     console.log("User created!");
//     console.log(result);
//   })
//   .catch(err => {
//     if (err.errno == 1062) {
//       console.error("User is already register!");
//     } else {
//       console.error(err);
//     }
//   });
//
// const user = {
//   username: 'leonardo.1212@yandex.ua12',
//   password: 'wasya121212',
//   image: 'images/...12'
// };

let app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/templates/pages'));

app.use(cookieParser());

// Session
app.use(session({
  secret: 'AnoHana',
  cookie: { maxAge: 14 * 24 * 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: true,
  // cookie: {
  //   // secure: true,
  //   maxAge: 24 * 60 * 60 * 1000 // 24 hours
  // }
  // store: SequelizeStore({
  //       db: sequelize
  //   })
}));

// app.use(cookieSession({
//   name: 'session',
//   keys: ['key'],
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))

// headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(function(err, req, res, next) {
    console.log(err);
});

// user
app.get('/user', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.render('create_user.pug');
});

// login
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user',
    badRequestMessage: 'Missing username or password.',
    failureFlash: false
}), (req, res) => {
  res.redirect('/');
});
// app.post('/login', (req, res, next) => {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//
//     if (!user) {
//       console.log("REDIRECT", 'login')
//       return res.redirect('/login');
//     }
//
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//
//       console.log("REDIRECT", user)
//       return res.render('movies.pug');
//     });
//   })(req, res, next);
// });

// all
app.get('/*', (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/user');
  } else {
    next();
  }
});

require('./routes/index')(app);



// Router




// app.post('/login', passport.authenticate('local', { successRedirect: '/',
//                                                     failureRedirect: '/login' }));

// var file_reader = fs.createReadStream('my_picture.jpg').pipe(stream)
// app.post('/user', (req, res) => {
//   console.log(req.body);
//
//   var busboy = new Busboy({ headers: req.headers });
//     busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
//       console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
//       // file.pipe(fs.createWriteStream(path.join(__dirname, '/public/files', path.basename(fieldname) + `.${mimetype.split("/")[1]}`)));
//       file.pipe(stream);
//       file.on('data', function(data) {
//         console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
//       });
//       file.on('end', function() {
//         console.log('File [' + fieldname + '] Finished');
//       });
//     });
//     busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
//       console.log('Field [' + fieldname + ']: value: ' + util.inspect(val));
//     });
//     busboy.on('finish', function() {
//       console.log('Done parsing form!');
//       res.writeHead(303, { Connection: 'close', Location: '/' });
//       res.end();
//     });
//     req.pipe(busboy);
//
//   // var form = new multiparty.Form();
//   //
//   //   form.parse(req, function(err, fields, files) {
//   //     res.writeHead(200, {'content-type': 'text/plain'});
//   //     // res.write('received upload:\n\n');
//   //     // res.end(util.inspect({fields: fields, files: files}));
//   //     // console.log(fields)
//   //     Object.keys(fields).forEach(function(name) {
//   //       console.log('got field named ' + name);
//   //     });
//   //
//   //     Object.keys(files).forEach(function(name) {
//   //       console.log('got file named ' + name);
//   //     });
//   //   });
// });

app.listen(PORT);
console.log(`Server work on port ${PORT}`);
