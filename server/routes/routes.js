const express = require('express');

const ProfileCtrl = require('../controllers/profileController');

const router = express.Router();

router.post('/', ProfileCtrl.createProfile);
router.get('/', ProfileCtrl.getProfile);

module.exports = router;