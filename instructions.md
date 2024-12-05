# Product Requirements Document (PRD)

## Project Overview

This project involves creating an AI-driven trading bot that interacts with The Open Network (TON) to analyze trending meme coins, engage with their communities, and automate trading decisions. The system integrates sentiment analysis, market data collection, and automated trading functionalities to maximize trading opportunities.

## Table of Contents

- Core Functionalities
- Technical Requirements
- Project Structure
- Documentation and Integration Guides
- Implementation Guidelines

## 1. Core Functionalities

### 1.1 Meme Coin Analysis and Community Insights

#### Fetch Trending Meme Coins

- Source top trending meme coins using **TONScan API**
- Identify meme coin communities and collect Telegram group links associated with these coins

#### Telegram Data Analysis

- Use the **Telethon library** to scrape and store Telegram group chat history
- Process retrieved chat data for sentiment analysis and activity tracking

#### Twitter Data Analysis 

- Using Selenium

#### Sentiment Analysis and Community Engagement

Analyze content in group chats to identify:

- Positive announcements, such as partnerships, product launches, and milestones
- Negative announcements, such as delays, regulatory issues, and team departures
- Engagement patterns, including growth in member count and participation levels
- Influencer endorsements and overall community sentiment

### 1.2 Market Analysis and Trading Decisions

#### Market Data Collection

Gather real-time and historical data on:

- **Price Data**: Current and historical asset prices
- **Order Book Data**: Current buy/sell orders and market depth
- **Volume Data**: Trading volume for specific assets
- **Market Sentiment**: External sentiment analysis (optional)

#### Strategy Implementation

Implement predefined strategies for trading:

- **Trend Following**: Buy during uptrends and sell during downtrends
- **Mean Reversion**: Trade based on asset price reverting to its average
- **Arbitrage**: Exploit price differences between exchanges
- **Scalping**: Execute frequent small trades
- **News-Based Trading**: React to breaking news or announcements

#### Decision-Making Framework

Combine insights from sentiment analysis and market data to decide:

- When to execute trades
- Which tokens to prioritize based on the likelihood of price changes

## 2. Technical Requirements

### APIs and Libraries

- **TONScan API**: For fetching top meme coins
- **Telethon Library**: For Telegram group data extraction
- Get the tweets from X

#### How do we train the bot: We give it the data

### System Components

- **Data Processing Pipeline**:
  - Fetch data from TONScan, Telegram and X
  - Clean and preprocess text data for analysis

- **Trading Execution Module**:
  - Integrate with TON DEXs for executing trades

- **Risk Management System**:
  - Implement stop-loss and take-profit mechanisms

## 3. Project Structure

### File Structure

- **/data**: Scripts for data collection and storage
- **/analysis**: Code for sentiment analysis and community engagement tracking
- **/trading**: Modules for strategy implementation and trade execution
- **/utils**: Helper functions for API calls and data preprocessing

## 4. Documentation and Integration Guides

### TONScan Implementation

```javascript
// Fetch data from the specified URL
const fetchData = async () => {
  try {
    const response = await fetch('https://jetton-index.tonscan.org/dyor/jettons/all?limit=40&offset=0&category=jettons');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Execute the function
fetchData();
```

### Telethon Implementation

```python
from telethon import TelegramClient

# Replace with your API ID, API Hash, and Phone Number
api_id = '26142856'
api_hash = 'c2bbc4c114eaef6933015b6cfb3cbadf'
phone = '9175530399'

# Initialize the client
client = TelegramClient('session_name', api_id, api_hash)
async def main():
    # Connect to Telegram
    await client.start(phone)
    group = await client.get_entity('https://t.me/BerachainIndia')

    # Fetch recent messages
    async for message in client.iter_messages(group, limit=100):
        print(f"{message.sender_id}: {message.text}")

# Run the client
with client:
    client.loop.run_until_complete(main())
```

### Get Data from X

```python
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress TensorFlow logging

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time
from webdriver_manager.chrome import ChromeDriverManager

# Set up the Chrome driver with options
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
url = "https://x.com/thenotcoin"
driver.get(url)

# Give the page some time to load
time.sleep(5)

# Scroll to load more tweets
scroll_pause_time = 3  # Adjust if needed
last_height = driver.execute_script("return document.body.scrollHeight")

# List to store tweets to avoid duplicates
tweets_set = set()

while len(tweets_set) < 9:
    parent_divs = driver.find_elements(By.XPATH, '//div[contains(@class, "css-175oi2r") and contains(@class, "r-1iusvr4") and contains(@class, "r-16y2uox") and contains(@class, "r-1777fci") and contains(@class, "r-kzbkwu")]')
    
    for parent in parent_divs:
        # Extract tweet text
        child_divs = parent.find_elements(By.XPATH, './/div[@class="css-175oi2r" and not(@class!="css-175oi2r")]')
        if len(child_divs) > 1:
            second_child = child_divs[1]
            clean_text = second_child.text.strip().replace('\n', ' ')
            if clean_text and clean_text not in tweets_set:  # Avoid duplicates
                tweets_set.add(clean_text)
                print(f"Tweet: {clean_text}")
                if len(tweets_set) >= 30:
                    break
    
    # Scroll down to load more content
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(scroll_pause_time)
    
    # Check if we've reached the bottom of the page
    new_height = driver.execute_script("return document.body.scrollHeight")
    last_height = new_height

driver.quit()
```

### Price Data

```javascript
// Fetch data from the specified URL
const fetchData = async () => {
  try {
    const response = await fetch('https://jetton-index.tonscan.org/dyor/api/proxy/jettons/addr/EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT/');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Execute the function
fetchData();
```

### Create TON Wallet

```javascript
const TonWeb = require("tonweb");
const nacl = require("tweetnacl");

(async () => {
  // Initialize TonWeb with the testnet endpoint
  const tonwebInstance = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC'));

  // Create a key pair
  const keyPair = nacl.sign.keyPair();

  // Extract the public key from the key pair
  const publicKey = keyPair.publicKey;
  const publicKeyHex = Buffer.from(publicKey).toString("hex");

  // Extract the private key from the key pair
  const privateKey = keyPair.secretKey;
  const privateKeyHex = Buffer.from(privateKey).toString("hex");

  // Create a wallet using the public key as Uint8Array
  const wallet = tonwebInstance.wallet.create({ publicKey });

  // Get the wallet address
  const walletAddress = (await wallet.getAddress()).toString(true, true, true);

  console.log("Wallet address:", walletAddress);
  console.log("Public key (hex):", publicKeyHex);
  console.log("Private key (hex):", privateKeyHex);
})();
```

### Create JTON Wallet

```python
const TonWeb = require('tonweb');
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {
  api_key: 'YOUR_API_KEY_HERE'
}));

async function getJettonWallet() {
  try {
    const jettonMinter = new TonWeb.token.jetton.JettonMinter(tonweb.provider, {
      address: 'EQDnRHbK5vJBLQyAnS6V8XNoRerCebnn9A2FlVlHtFVLFGZ-'  // Replace with verified Jetton Master Address usdt right now
    });

    const ownerAddress = new TonWeb.utils.Address('EQA9K5jEY6Ky46wHLjSBuYh0CtSpwsyltjvcVZ05ELeDYiDq');  // owner wallet address

    const jettonWalletAddress = await jettonMinter.getJettonWalletAddress(ownerAddress);

    console.log(jettonWalletAddress.toString(true, true, true));

    // Validate Jetton Wallet
    const jettonWallet = new TonWeb.token.jetton.JettonWallet(tonweb.provider, {
      address: jettonWalletAddress
    });

    // const jettonData = await jettonWallet.getData();
    // if (jettonData.jettonMinterAddress.toString(false) !== jettonMinter.address.toString(false)) {
    //   throw new Error('Jetton Minter address from Jetton Wallet does not match the provided Jetton Master.');
    // } // not working for some reason

    console.log('Jetton wallet address:', jettonWalletAddress.toString(true, true, true));

  } catch (error) {
    console.error('Error fetching Jetton Wallet:', error);
  }
}

getJettonWallet();
```

### How to Create a Bot with Its Own Wallet on TON

For detailed instructions, visit: https://docs.ton.org/v3/guidelines/dapps/tutorials/telegram-bot-examples/accept-payments-in-a-telegram-bot-2