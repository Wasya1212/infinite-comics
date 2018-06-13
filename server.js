const express = require('express');
const path = require('path');
const multiparty = require('multiparty');
const util = require('util');
const mysql = require('./middleware/mysql');
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

let poolConnection = new mysql({
  connectionLimit: 10,
  host: 'sql7.freemysqlhosting.net',
  user: 'sql7242175',
  password: 'UcG1k1f9zf',
  database: 'sql7242175'
});

const user = {
  username: 'leonardo.1212@yandex.ua12',
  password: 'wasya121212',
  image: 'images/...12'
};

let app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/templates/pages'));
// var file_reader = fs.createReadStream('my_picture.jpg').pipe(stream)
app.post('/user', (req, res) => {
  console.log(req.body);

  var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      // file.pipe(fs.createWriteStream(path.join(__dirname, '/public/files', path.basename(fieldname) + `.${mimetype.split("/")[1]}`)));
      file.pipe(stream);
      file.on('data', function(data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
      });
      file.on('end', function() {
        console.log('File [' + fieldname + '] Finished');
      });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('Field [' + fieldname + ']: value: ' + util.inspect(val));
    });
    busboy.on('finish', function() {
      console.log('Done parsing form!');
      res.writeHead(303, { Connection: 'close', Location: '/' });
      res.end();
    });
    req.pipe(busboy);

  // var form = new multiparty.Form();
  //
  //   form.parse(req, function(err, fields, files) {
  //     res.writeHead(200, {'content-type': 'text/plain'});
  //     // res.write('received upload:\n\n');
  //     // res.end(util.inspect({fields: fields, files: files}));
  //     // console.log(fields)
  //     Object.keys(fields).forEach(function(name) {
  //       console.log('got field named ' + name);
  //     });
  //
  //     Object.keys(files).forEach(function(name) {
  //       console.log('got file named ' + name);
  //     });
  //   });
});

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.render('frontpage.pug');
});

app.get('/add_user', (req, res) => {
  poolConnection.insert('users', [user.username, user.password, user.image])
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.error(err);
    });
});

app.get('/user', (req, res) => {
  poolConnection.getList('users')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      if (err.errno == 1146) {
        poolConnection.createTable(err.errtable)
          .catch(err => {
            console.error(err);
          });
      }
      console.error(err);
      res.end("Any users not found");
    });
});

app.get('/create-user', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.render('create_user.pug');
});

app.get('/characters', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.render('characters.pug');
});

app.get('/comics', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.render('comics.pug');
});

app.get('/movies', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.render('movies.pug');
});

app.get('/tv', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.render('tv.pug');
});

app.get('/news', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.render('news.pug');
});

app.get('/shop', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.render('shop.pug');
});

app.get('/*', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send("Fuck you!");
});

app.listen(PORT);
console.log(`Server work on port ${PORT}`);
