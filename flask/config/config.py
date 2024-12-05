import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Telegram API Credentials
    TELEGRAM_API_ID = os.getenv('TELEGRAM_API_ID')
    TELEGRAM_API_HASH = os.getenv('TELEGRAM_API_HASH')
    TELEGRAM_PHONE = os.getenv('TELEGRAM_PHONE')

    # TON Blockchain Credentials
    TON_API_KEY = os.getenv('TON_API_KEY')
    TON_ENDPOINT = os.getenv('TON_ENDPOINT', 'https://testnet.toncenter.com/api/v2/jsonRPC')

    # Database Configuration
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///ton_trading_bot.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False