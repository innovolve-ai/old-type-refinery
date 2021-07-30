from project import db, bcrypt
from flask_login import UserMixin
from datetime import datetime
from flask import current_app
from loguru import logger
#from flask_mongoengine import 

#from flask_mongoengine import Document, StringField, EmailField, URLField, BooleanField, DateTimeField

class User(UserMixin, db.Document):
    first_name = db.StringField(max_length=50)
    last_name = db.StringField(max_length=50)
    email = db.EmailField(required=True, unique=True)
    hashed_password = db.StringField(required=True)
    avatar = db.URLField()
    is_admin = db.BooleanField(default=False)
    created_at = db.DateTimeField(default=datetime.utcnow)
    updated_at = db.DateTimeField(default=datetime.utcnow)

    def is_correct_password(self, plaintext_password: str):
        return bcrypt.check_password_hash(self.hashed_password, plaintext_password)

class Connection(db.Document):
    desription = db.StringField()
    url = db.StringField(required=True)
    port = db.StringField()
    keyspace = db.StringField(required=True)
    gq_query = db.StringField(required=True)


    
        

    