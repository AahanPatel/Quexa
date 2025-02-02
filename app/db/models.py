from flask_login import UserMixin
from datetime import datetime, date
from app.db import db

# User Model
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


# Post Model
class Post(db.Model, UserMixin):
    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    comment_id = db.Column(db.String(10))
    poster = db.Column(db.String(100))
    topic = db.Column(db.String(50))
    title = db.Column(db.String(100))
    message = db.Column(db.String(200))
    image_name = db.Column(db.String(10))

    def __init__(self, comment_id, poster, title, message, image_name):
        self.comment_id = comment_id
        self.poster = poster
        self.title = title
        self.message = message
        self.image_name = image_name


# Comment Model
class Comment(db.Model, UserMixin):
    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    post_id = db.Column(db.String(10))
    poster = db.Column(db.String(100))
    message = db.Column(db.String(200))

    def __init__(self, post_id, poster, message):
        self.post_id = post_id
        self.poster = poster
        self.message = message
