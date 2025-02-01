from flask import render_template, redirect, request, Blueprint, session, url_for
from wtforms import StringField, PasswordField, EmailField, BooleanField
from wtforms.validators import InputRequired, Length, EqualTo
from flask_wtf import FlaskForm
from flask_login import LoginManager, login_user, current_user, logout_user, login_required

services_blueprint = Blueprint('services', __name__)


@services_blueprint.route('/posts')
@login_required
def posts():
    return render_template('post.html')


@services_blueprint.route('/create')
def create():
    return render_template('create.html')
