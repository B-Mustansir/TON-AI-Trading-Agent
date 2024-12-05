const axios = require('axios');

class TONScanService {
  static async fetchTrendingCoins() {
    try {
      const response = await axios.get('https://jetton-index.tonscan.org/dyor/jettons/all', {
        params: {
          limit: 40,
          offset: 0,
          category: 'jettons'
        }
      });
      return response.data;
    } catch (error) {
      console.error('TONScan API Error:', error);
      throw error;
    }
  }

  static async fetchCoinPrice(coinAddress) {
    try {
      const response = await axios.get(`https://jetton-index.tonscan.org/dyor/api/proxy/jettons/addr/${coinAddress}`);
      return response.data;
    } catch (error) {
      console.error('Coin Price Fetch Error:', error);
      throw error;
    }
  }
}