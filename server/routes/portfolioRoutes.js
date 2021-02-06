const express = require('express');

const PortfolioController = require('../controllers/portfolioController');

const router = express.Router();

router.post('/add', PortfolioController.createPortfolio);

module.exports = router;