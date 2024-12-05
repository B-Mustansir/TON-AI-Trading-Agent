from telethon import TelegramClient
from telethon.tl.functions.messages import GetDialogsRequest
from telethon.tl.types import InputPeerEmpty
import asyncio

class TelegramService:
    def __init__(self, api_id, api_hash, phone):
        self.client = TelegramClient('session', api_id, api_hash)
        self.api_id = api_id
        self.api_hash = api_hash
        self.phone = phone

    async def connect(self):
        await self.client.start(phone=self.phone)

    async def fetch_group_messages(self, group_link, limit=100):
        await self.connect()
        
        try:
            group = await self.client.get_entity(group_link)
            messages = await self.client.get_messages(group, limit=limit)
            
            return [
                {
                    'sender_id': msg.sender_id,
                    'text': msg.text,
                    'timestamp': msg.date
                } for msg in messages if msg.text
            ]
        finally:
            await self.client.disconnect()

    async def get_group_info(self, group_link):
        await self.connect()
        
        try:
            group = await self.client.get_entity(group_link)
            return {
                'id': group.id,
                'title': group.title,
                'participants_count': group.participants_count
            }
        finally:
            await self.client.disconnect()