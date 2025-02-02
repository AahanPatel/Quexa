from wtforms import StringField, PasswordField, EmailField, BooleanField
from wtforms.validators import InputRequired, Length, EqualTo
from flask_wtf import FlaskForm
from flask import render_template, redirect, Blueprint, url_for
from app.db import db
from app.db.models import User
from flask_login import LoginManager, login_user, current_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash

auth_blueprint = Blueprint('auth', __name__, template_folder='templates')
login_manager = LoginManager()
login_manager.login_view = 'auth.login'

class register_form(FlaskForm):
    name = StringField('Name', validators=[InputRequired(), Length(min=1, max=15)])
    password = PasswordField('Password', validators=[InputRequired(), Length(min=8, max=80)])

class login_form(FlaskForm):
    name = EmailField('Name', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])
    remember = BooleanField('Remember')

@login_manager.user_loader
def load_user(user_id):
    return db.session.query(User).filter(User.id == user_id).first()


@login_manager.unauthorized_handler
def unauthorized():
    return redirect(url_for('auth.login'))

@auth_blueprint.route('/auth/register', methods=["POST", "GET"])
def register():
    if current_user.is_authenticated:
        return redirect(url_for("services.browser"))
    form = register_form()
    if form.validate_on_submit():
        user = db.session.query(User).filter(User.name == form.name.data).first()
        if user is not None:
            form.name.errors.append('You already have an account. Please log in.')
            return render_template('register.html', form=form)
        new_user = User(name=form.name.data, password=generate_password_hash(form.password.data), hours=0, score=0)  # Storing the login info in the database if it is not
        db.session.add(new_user)
        logout_user()
        db.session.commit()
        return redirect(url_for("services.browser", name=form.name.data))
    return render_template('register.html', form=form)

@auth_blueprint.route('/auth/login', methods=["POST", "GET"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("services.browser"))
    form = login_form()
    if form.validate_on_submit():
        user = db.session.query(User).filter(User.name == form.name.data).first()
        if user is None:
            form.name.errors.append('You do not have a account please register.')
            return render_template('login.html', form=form)
        elif not check_password_hash(user.password, form.password.data):
            form.password.errors.append('Please check your login details.')
            return render_template('login.html', form=form)
        login_user(user, remember=form.remember.data)
        return redirect(url_for('services.browser'))
    return render_template('login.html', form=form)

