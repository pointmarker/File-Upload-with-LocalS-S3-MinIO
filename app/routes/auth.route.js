const express = require('express');
const { loginController } = require('../controllers/auth.controller');
const router = express.Router();

router.route('/login').post(loginController)

module.exports = router