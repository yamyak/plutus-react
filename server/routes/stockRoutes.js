const express = require('express');

const StockController = require('../controllers/stockController');

const router = express.Router();

router.post('/add', StockController.addStock);
router.post('/delete', StockController.deleteStock);
router.post('/getStock', StockController.getStock);

module.exports = router;