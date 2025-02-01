from flask import render_template, redirect, request, Blueprint, session, url_for
from flask_login import current_user

public_blueprint = Blueprint('public', __name__)

@public_blueprint.route('/')
def index():
    return redirect(url_for("public.home"))

@public_blueprint.route('/home')
def home():
    return render_template('home.html')



