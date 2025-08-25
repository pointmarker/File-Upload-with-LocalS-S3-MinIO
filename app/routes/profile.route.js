const express = require('express');
const { authorize } = require('../middleware/authorize');
const { serveHTML } = require('../services/static.service');
const router = express.Router();

router.route('/').get(authorize,serveHTML('profile'))

module.exports = router