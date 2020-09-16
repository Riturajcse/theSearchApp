const express = require('express');
const router = express.Router();
const sanitizeRequest = require('../middleware/sanitizeRequest')
const AuthService = require('../services/AuthService');

router.post('/', sanitizeRequest, AuthService.authorize);

module.exports = router;