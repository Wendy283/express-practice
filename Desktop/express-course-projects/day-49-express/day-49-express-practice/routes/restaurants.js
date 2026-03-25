const express = require('express');
const uuid = require('uuid');

const resData = require('../utils/restaurant-data');


const router = express.Router();

// Get all restaurants
router.get('/restaurants', (req, res) => {
  let order = req.query.order;

  if (order !== 'asc' && order !== 'desc') {
    order = 'asc';
  }

  const nextOrder = order === 'asc' ? 'desc' : 'asc';

  const storedRestaurants = resData.getStoredRestaurants();

  storedRestaurants.sort((a, b) => {
    return order === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  res.render('restaurants',{ 
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder
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
