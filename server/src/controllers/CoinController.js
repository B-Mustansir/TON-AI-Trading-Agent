const Coin = require('../models/CoinModel');
const TONScanService = require('../services/TONScanService');
const TwitterService = require('../services/TwitterService');
const SentimentAnalysisService = require('../services/SentimentAnalysisService');

class CoinController {
    static async analyzeCoin(req, res) {
        try {
            const { coinAddress } = req.params;

            // Fetch coin data from TONScan
            const coinData = await TONScanService.fetchCoinPrice(coinAddress);

            // Scrape Twitter for sentiment
            const tweets = await TwitterService.scrapeTwitter(coinData.twitterHandle);

            // Analyze sentiment
            const sentimentResults = tweets.map(tweet =>
                SentimentAnalysisService.analyzeSentiment(tweet)
            );

            // Aggregate sentiment
            const aggregateSentiment = sentimentResults.reduce((acc, curr) => ({
                score: acc.score + curr.score,
                positiveCount: acc.positiveCount + curr.positiveCount,
                negativeCount: acc.negativeCount + curr.negativeCount
            }), { score: 0, positiveCount: 0, negativeCount: 0 });

            // Update or create coin in database
            const updatedCoin = await Coin.findOneAndUpdate(
                { symbol: coinData.symbol },
                {
                    name: coinData.name,
                    currentPrice: coinData.price,
                    sentiment: aggregateSentiment
                },
                { upsert: true, new: true }
            );

            res.json(updatedCoin);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}