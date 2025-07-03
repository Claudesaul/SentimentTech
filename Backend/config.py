import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# MongoDB Configuration
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = 'twitterdb'
COLLECTION_NAME = 'tweets'
