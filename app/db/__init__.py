from flask_sqlalchemy import SQLAlchemy

# Creates database instance
def create_db_instance():
    db = SQLAlchemy()
    return db