class SentimentAnalysisService:
    POSITIVE_WORDS = ['bullish', 'moon', 'pump', 'partnership', 'growth', 'exciting']
    NEGATIVE_WORDS = ['bearish', 'dump', 'crash', 'regulation', 'delay', 'risk']

    @classmethod
    def analyze_sentiment(cls, text):
        text_lower = text.lower()
        
        positive_count = sum(1 for word in cls.POSITIVE_WORDS if word in text_lower)
        negative_count = sum(1 for word in cls.NEGATIVE_WORDS if word in text_lower)
        
        # Simple sentiment score calculation
        sentiment_score = positive_count - negative_count
        
        return {
            'score': sentiment_score,
            'positive_count': positive_count,
            'negative_count': negative_count
        }
