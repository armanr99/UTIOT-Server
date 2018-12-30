var express = require('express');
var router = express.Router();
var authController = require('../../controllers/auth');

router.post('/validateToken', authController.validateToken);

module.exports = router;