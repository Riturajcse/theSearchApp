const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const sanitizeRequest = require('../middleware/sanitizeRequest')
const YelpService = require('../services/YelpService');

//routes
router.post('/search', sanitizeRequest, auth, YelpService.searchBusiness);
router.post('/fetch', sanitizeRequest, auth, YelpService.getBusinessById);
router.post('/reviews', sanitizeRequest, auth, YelpService.getBusinessReviews);

module.exports = router;