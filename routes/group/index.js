var express = require('express');
var router = express.Router();
var groupController = require('../../controllers/group');

router.post('/signup', groupController.signup);

module.exports = router;