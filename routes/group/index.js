var express = require('express');
var router = express.Router();
var groupController = require('../../controllers/group');

router.post('/signup', groupController.signup);
router.post('/login', groupController.login);
router.get('/:name', groupController.getGroup);

module.exports = router;