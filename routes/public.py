from flask import render_template, redirect, request, Blueprint, session, url_for
from flask_login import current_user, logout_user, login_required

from app.db import db
from app.db.models import User

public_blueprint = Blueprint('public', __name__)

@public_blueprint.route('/')
def index():
    return redirect(url_for("public.home"))

@public_blueprint.route('/home')
def home():
    return render_template('home.html')

@public_blueprint.route('/store')
def store():
    return render_template('store.html')

@public_blueprint.route('/about')
def about():
    return render_template('about.html')

@public_blueprint.route('/profile')
@login_required
def profile():
    queried_user = db.session.query(User).filter(User.name == current_user.name).one()
    return render_template('profile.html', name=queried_user.name, score=queried_user.score)

@public_blueprint.route('/leaderboard')
def leaderboard():
    top_users_list = []
    top_users = db.session.query(User).order_by(User.score).limit(10).all()
    for i in top_users:
        top_users_list.append({"username": i.name, "score": i.score})
    return render_template('leaderboard.html', top_user_list = top_users_list[::-1])

@public_blueprint.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))




