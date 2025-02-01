from flask import Flask, render_template
import os

from app.db import db
from routes.auth import auth_blueprint, login_manager
from routes.public import public_blueprint
from routes.services import services_blueprint

app = Flask(__name__, template_folder="templates/html", static_folder="templates/static")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///main.db"
app.config['SECRET_KEY'] = os.urandom(12)

with app.app_context():

    # Initialize Database
    db.init_app(app)
    db.create_all()

    # Initialize login manager
    login_manager.init_app(app)

    # Register all routes
    app.register_blueprint(auth_blueprint, url_prefix="")
    app.register_blueprint(public_blueprint, url_prefix="")
    app.register_blueprint(services_blueprint, url_prefix="")


    app.run(debug=True)