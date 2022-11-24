const express = require('express');

const {
  findData,
} = require('../controllers/food_controller.js');

const router = express.Router();

router
  .get('/food', findData);

module.exports = router;
