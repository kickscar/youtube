from pymongo import MongoClient
from .config import dbconfig

client = MongoClient(**dbconfig['connection'])
db = client[dbconfig['connection']['authSource']]
collection = db[dbconfig['collection']]


def mongo_collectionlist():
    return db.list_collection_names()


def mongo_insert(data):
    for video in data:
        yutubevideo_id = collection.insert_one(video)
        print("new Document[%s] Created in Database[%s].Collection[%s]" %
              (yutubevideo_id, dbconfig['connection']['authSource'],  dbconfig['collection']))
