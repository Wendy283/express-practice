const path = require('path');

const express = require('express');

const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));


app.use('/', defaultRoutes);
app.use('/', restaurantRoutes);


// Other pages
app.get('/index', function (req, res) {
  res.render('index');
});

app.get('/confirm', function (req, res) {
  res.render('confirm');
});


// 404 handler
app.use(function (req, res) {
  res.status(404).render('404');
});

// 500 error handler
app.use(function (error, req, res, next) {
  console.error(error);
  res.status(500).render('500');
});

// Start server
app.listen(3001, function () {
  console.log('Server running on http://localhost:3001');
});