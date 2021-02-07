const express = require('express');

const StockController = require('../controllers/stockController');

const router = express.Router();

router.post('/add', StockController.addStock);

module.exports = router;