const express = require('express');

const PortfolioController = require('../controllers/portfolioController');

const router = express.Router();

// assigning portfolio access functions to routes
router.post('/create', PortfolioController.createPortfolio);
router.post('/get', PortfolioController.getPortfolio);

module.exports = router;