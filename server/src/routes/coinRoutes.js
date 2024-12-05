const express = require('express');
const CoinController = require('../controllers/CoinController');

const router = express.Router();

router.get('/analyze/:coinAddress', CoinController.analyzeCoin);

module.exports = router;