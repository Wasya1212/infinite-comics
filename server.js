const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

let app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/templates/pages'));

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.render('frontpage.pug');
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
