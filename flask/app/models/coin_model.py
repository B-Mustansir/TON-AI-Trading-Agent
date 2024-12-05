from app import db
from sqlalchemy.sql import func

class CoinModel(db.Model):
    __tablename__ = 'coins'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    symbol = db.Column(db.String(20), nullable=False, unique=True)
    telegram_group = db.Column(db.String(200))
    twitter_handle = db.Column(db.String(100))
    
    current_price = db.Column(db.Float)
    market_cap = db.Column(db.Float)
    
    sentiment_score = db.Column(db.Float, default=0)
    positive_mentions = db.Column(db.Integer, default=0)
    negative_mentions = db.Column(db.Integer, default=0)
    
    last_analyzed = db.Column(db.DateTime, server_default=func.now())
