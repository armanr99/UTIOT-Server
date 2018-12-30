var express = require('express');
var router = express.Router();
var group = require('./group');
var auth = require('./auth');

router.use('/group', group);
router.use('/auth', auth);

module.exports = router;