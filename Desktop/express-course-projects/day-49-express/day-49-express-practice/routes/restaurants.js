const express = require('express');
const uuid = require('uuid');

const resData = require('../utils/restaurant-data');


const router = express.Router();

// Get all restaurants
router.get('/restaurants', (req, res) => {
  const storedRestaurants = resData.getStoredRestaurants();

  res.render('restaurants', {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants
  });
});

// Get single restaurant
router.get('/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render('restaurant-detail', {
        restaurant: restaurant
      });
    }
  }

  res.status(404).render('404');
});

// Show recommendation form
router.get('/recommend', function (req, res) {
  res.render('recommend');
});

// Handle recommendation submission
router.post('/recommend', function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();

  const restaurants = resData.getStoredRestaurants();
  restaurants.push(restaurant);

  resData.storeRestaurants(restaurants);

  res.redirect('/confirm');
});

module.exports = router;
