from flask import render_template, redirect, request, Blueprint, session, url_for
from flask_wtf.file import FileRequired, FileField
from wtforms import StringField, PasswordField, EmailField, BooleanField
from wtforms.validators import InputRequired, Length, EqualTo
from flask_wtf import FlaskForm
from flask_login import LoginManager, login_user, current_user, logout_user, login_required
import shortuuid

services_blueprint = Blueprint('services', __name__)

class create_post_form(FlaskForm):
    title = StringField('Title', validators=[InputRequired(), Length(min=1, max=100)])
    message = StringField('Message', validators=[InputRequired(), Length(min=1, max=200)])
    photo = FileField(validators=[FileRequired()])
    topic = StringField('Title', validators=[InputRequired(), Length(min=1, max=100)])


@services_blueprint.route('/posts')
@login_required
def posts():
    return render_template('post.html')


@services_blueprint.route('/create')
@login_required
def create():
    return render_template('create.html')
