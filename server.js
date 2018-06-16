const express = require('express');
const path = require('path');
const multiparty = require('multiparty');
const util = require('util');
const fs = require('fs');
const bodyParser = require('body-parser');
const Busboy = require('busboy');
const cloudinary = require('cloudinary');

const PORT = process.env.PORT || 3000;

cloudinary.config({
  cloud_name: 'dtquxmxcs',
  api_key: '219447449487377',
  api_secret: 'YsATAdSo0HSkKKu1Xhp9n4bV3js'
});

let stream = cloudinary.v2.uploader.upload_stream(function(error, result){console.log(result)});

const Sequelize = require('sequelize');
const sequelize = new Sequelize('sql7242175', 'sql7242175', 'UcG1k1f9zf', {
  host: 'sql7.freemysqlhosting.net',
  dialect: 'mysql',
  operatorsAliases: Sequelize.Op,
  pool: {
    max: 10,
    min: 0,
    idle: 100000
  }
});

let Comics = sequelize.define('comics', {
  title: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  description: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

Comics.sync({force: true}).then(function () {
  // Table created
  return Comics.create({
    title: 'marvel',
    lastName: 'some desc'
  });
});

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

// Router
require('./routes/index')(app);

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
