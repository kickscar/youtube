from mongotools.mongo import *

userid = collection.insert_one({'name': '또치', 'email': 'ddochi@kickscar.me'})
print(userid)
