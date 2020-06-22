from pymongo import MongoClient

client = MongoClient(
    host='127.0.0.1',
    port=27017,
    username='mydb',
    password='mydb',
    authSource='mydb',
    authMechanism='SCRAM-SHA-256')
db = client['mydb']

collectionlist = db.list_collection_names()
print(collectionlist)
