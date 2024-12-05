from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time

class XScraperService:
    @staticmethod
    def scrape_tweets(username, max_tweets=30):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")

        driver = webdriver.Chrome(options=chrome_options)
        
        try:
            driver.get(f"https://x.com/{username}")
            time.sleep(5)

            tweets_set = set()
            
            while len(tweets_set) < max_tweets:
                parent_divs = driver.find_elements(
                    By.XPATH, 
                    '//div[contains(@class, "css-175oi2r") and contains(@class, "r-1iusvr4")]'
                )
                
                for parent in parent_divs:
                    try:
                        tweet_text = parent.text.strip().replace('\n', ' ')
                        if tweet_text and tweet_text not in tweets_set:
                            tweets_set.add(tweet_text)
                            
                            if len(tweets_set) >= max_tweets:
                                break
                    except Exception:
                        continue
                
                # Scroll down
                driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(2)

            return list(tweets_set)
        
        finally:
            driver.quit()