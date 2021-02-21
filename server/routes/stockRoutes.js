const express = require('express');

const StockController = require('../controllers/stockController');

const router = express.Router();

// assigning stock access functions to routes
router.post('/add', StockController.addStock);
router.post('/delete', StockController.deleteStock);

module.exports = router;