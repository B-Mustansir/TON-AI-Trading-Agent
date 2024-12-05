class SentimentAnalysisService {
    static analyzeSentiment(text) {
        // Simple sentiment analysis 
        const positiveWords = ['bullish', 'moon', 'pump', 'partnership', 'growth'];
        const negativeWords = ['bearish', 'dump', 'crash', 'regulation', 'delay'];

        const lowerText = text.toLowerCase();

        const positiveScore = positiveWords.filter(word => lowerText.includes(word)).length;
        const negativeScore = negativeWords.filter(word => lowerText.includes(word)).length;

        return {
            score: positiveScore - negativeScore,
            positiveCount: positiveScore,
            negativeCount: negativeScore
        };
    }
}