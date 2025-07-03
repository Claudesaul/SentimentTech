import requests
from pymongo import MongoClient
import certifi
import os
from dotenv import load_dotenv

# Replace these with your actual values
AUTHORIZATION = os.getenv("DISCORD_USER_TOKEN")
CHANNEL_ID = "1073672806669234238"

headers = {
    "Authorization": AUTHORIZATION,
    "User-Agent": "Mozilla/5.0",
}

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = client['discord_scraper']  # or your existing DB name
collection = db[f"user_scraped_messages_{CHANNEL_ID}"]

def get_messages(channel_id, limit=100):
    url = f"https://discord.com/api/v9/channels/{channel_id}/messages?limit={limit}"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch messages: {response.status_code} {response.text}")
        return []

if __name__ == "__main__":
    messages = get_messages(CHANNEL_ID)
    if messages:
        result = collection.insert_many(messages)
        print(f"Inserted {len(result.inserted_ids)} messages into MongoDB.")
    else:
        print("No messages fetched.") 