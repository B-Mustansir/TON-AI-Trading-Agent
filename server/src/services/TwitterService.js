const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class TwitterService {
  static async scrapeTwitter(handle) {
    let driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options().headless())
      .build();

    try {
      await driver.get(`https://x.com/${handle}`);
      
      const tweets = [];
      const tweetElements = await driver.findElements(By.xpath('//div[contains(@class, "tweet-text")]'));
      
      for (let element of tweetElements) {
        const tweetText = await element.getText();
        tweets.push(tweetText);
      }

      return tweets;
    } catch (error) {
      console.error('Twitter Scraping Error:', error);
      throw error;
    } finally {
      await driver.quit();
    }
  }
}
