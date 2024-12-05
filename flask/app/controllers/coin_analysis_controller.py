from flask import Blueprint, jsonify, request
from app.models.coin_model import CoinModel
from app.services.telegram_service import TelegramService
from app.services.x_scraper_service import XScraperService
from app.services.sentiment_analysis_service import SentimentAnalysisService
from app import db
import asyncio

coin_analysis_bp = Blueprint('coin_analysis', __name__)

@coin_analysis_bp.route('/analyze/<string:coin_symbol>', methods=['POST'])
def analyze_coin(coin_symbol):
    try:
        # Fetch existing coin or create new
        coin = CoinModel.query.filter_by(symbol=coin_symbol).first()
        if not coin:
            coin = CoinModel(symbol=coin_symbol)
            db.session.add(coin)

        # Scrape Twitter
        tweets = XScraperService.scrape_tweets(coin.twitter_handle)
        
        # Analyze sentiment
        sentiments = [SentimentAnalysisService.analyze_sentiment(tweet) for tweet in tweets]
        
        # Aggregate sentiment
        total_sentiment = {
            'score': sum(s['score'] for s in sentiments),
            'positive_count': sum(s['positive_count'] for s in sentiments),
            'negative_count': sum(s['negative_count'] for s in sentiments)
        }

        # Update coin model
        coin.sentiment_score = total_sentiment['score']
        coin.positive_mentions = total_sentiment['positive_count']
        coin.negative_mentions = total_sentiment['negative_count']

        # Fetch Telegram group info (async)
        async def get_telegram_info():
            telegram_service = TelegramService(
                api_id=Config.TELEGRAM_API_ID, 
                api_hash=Config.TELEGRAM_API_HASH, 
                phone=Config.TELEGRAM_PHONE
            )
            return await telegram_service.get_group_info(coin.telegram_group)

        telegram_info = asyncio.run(get_telegram_info())
        
        # Commit changes
        db.session.commit()

        return jsonify({
            'coin': coin.symbol,
            'sentiment': total_sentiment,
            'telegram_info': telegram_info,
            'tweets': tweets
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500