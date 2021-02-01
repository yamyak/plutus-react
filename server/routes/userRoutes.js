const express = require('express');

const UserCtrl = require('../controllers/userController');

const router = express.Router();

router.post('/signup', UserCtrl.createUser);
router.post('/signin', UserCtrl.getProfile);
router.get('/signout', UserCtrl.closeProfile);

module.exports = router;