from flask import Flask, render_template
from app.db import create_db_instance


app = Flask(__name__, template_folder="templates/html", static_folder="templates/static")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///main.db"

@app.route('/')
def index():
    return render_template("index.html")

with app.app_context():
    db = create_db_instance()
    db.init_app(app)
    db.create_all()
    app.run(debug=True)