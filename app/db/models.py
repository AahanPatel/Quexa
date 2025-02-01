from flask_login import UserMixin
from datetime import datetime, date
from app.db import db

# User class
class User(db.Model, UserMixin):
    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100))
    password = db.Column(db.String(100))
    hours = db.Column(db.Float)
    score = db.Column(db.Integer)

    def __init__(self, name, password, hours, score):
        self.name = name
        self.password = password
        self.hours = hours
        self.score = score