const fs = require('fs');
const path = require('path');

const express = require('express');
const uuid = require('uuid');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.send('<h1>Hello World</h1>');
});

app.get('/restaurants', (req, res) => {
     const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

  res.render('restaurants', {numberOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants});
});

   app.get('/restaurants/:id', (req, res) => {
    const restaurantId = req.params.id;
    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    for (const restaurant of storedRestaurants) {
        if (restaurant.id === restaurantId) {
            return res.render('restaurant-detail', {restaurant: restaurant });
        }
    }
     res.render('404');
   });

app.get('/recommend', function (req, res) {
    res.render('recommend');
});

app.post('/recommend', function (req, res) {
    const restaurant = req.body;
    restaurant.id  = uuid.v4();
    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);


    storedRestaurants.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants, null, 2));

    res.redirect('/confirm');
});

app.get('/index', function (req, res) {
    res.render('index');
});

app.get('/confirm', function (req, res) {
    res.render('confirm');
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.use(function (req, res) { 
    res.render('404');
});

app.use(function (error, req, res, next) { 
    res.render('500');
});

app.listen(3001, function () {
    console.log('Server running on http://localhost:3001');
});