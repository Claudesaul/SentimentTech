from pymongo import MongoClient
from config import MONGO_URI, DB_NAME, COLLECTION_NAME
import certifi

# Create MongoDB client
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())

# Use DB_NAME and COLLECTION_NAME from config.py
db = client[DB_NAME]
tweets_collection = db[COLLECTION_NAME]

def get_collection():
    """Get the tweets collection."""
    return tweets_collection
