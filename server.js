const express = require('express');
const path = require('path');
// const mysql = require('mysql');
const mysql = require('./middleware/mysql');
const fs = require('fs');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

// let pool = mysql.createPool({
//   connectionLimit: 10,
//   host: 'sql7.freemysqlhosting.net',
//   user: 'sql7242175',
//   password: 'UcG1k1f9zf',
//   database: 'sql7242175'
// });

let poolConnection = new mysql({
  connectionLimit: 10,
  host: 'sql7.freemysqlhosting.net',
  user: 'sql7242175',
  password: 'UcG1k1f9zf',
  database: 'sql7242175'
});

// connection.connect();

const user = {
  username: 'leonardo.1212@yandex.ua',
  password: 'wasya1212',
  image: 'images/...'
};

let app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/templates/pages'));

var multiparty = require('multiparty');
var util = require('util');

app.post('/user', (req, res) => {
  console.log(req.body);
  var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
});

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.render('frontpage.pug');
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
