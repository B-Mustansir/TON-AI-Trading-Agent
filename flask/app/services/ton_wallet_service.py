from ton.lib.wallet import Wallet
from ton.lib.tonlib import TonLib

class TONWalletService:
    def __init__(self, endpoint, api_key):
        self.tonlib = TonLib(endpoint=endpoint, api_key=api_key)

    def create_wallet(self):
        # Create a new wallet
        wallet = Wallet(self.tonlib)
        
        # Get wallet details
        wallet_info = {
            'address': wallet.address,
            'public_key': wallet.public_key,
            'private_key': wallet.private_key
        }
        
        return wallet_info

    def get_wallet_balance(self, address):
        # Fetch wallet balance
        balance = self.tonlib.get_balance(address)
        return balance