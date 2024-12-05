const mongoose = require('mongoose');

const CoinSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  telegramGroup: { type: String },
  twitterHandle: { type: String },
  currentPrice: { type: Number },
  marketCap: { type: Number },
  sentiment: {
    score: { type: Number, default: 0 },
    positiveCount: { type: Number, default: 0 },
    negativeCount: { type: Number, default: 0 }
  },
  lastAnalyzed: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coin', CoinSchema);