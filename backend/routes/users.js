const _ = require('lodash');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const sanitizeRequest = require('../middleware/sanitizeRequest')
const UserService = require('../services/UserService');
const YelpService = require('../services/YelpService');

//routes
router.get('/', sanitizeRequest, auth, UserService.fetchUsers);
router.post('/', sanitizeRequest, UserService.createUser);

module.exports = router;