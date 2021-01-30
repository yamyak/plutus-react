const express = require('express');

const ProfileCtrl = require('../controllers/profileController');
const PortfolioCtrl = require('../controllers/portfolioController');

const router = express.Router();

router.post('/portfolio', ProfileCtrl.createProfile);
router.put('/portfolio', PortfolioCtrl.createProfile);

module.exports = router;