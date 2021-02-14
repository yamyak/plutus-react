const express = require('express');

const StockController = require('../controllers/stockController');

const router = express.Router();

router.post('/add', StockController.addStock);
router.post('/delete', StockController.deleteStock);

module.exports = router;