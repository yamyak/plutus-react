const express = require('express');

const PortfolioController = require('../controllers/portfolioController');

const router = express.Router();

router.post('/create', PortfolioController.createPortfolio);
router.post('/get', PortfolioController.getPortfolio);

module.exports = router;