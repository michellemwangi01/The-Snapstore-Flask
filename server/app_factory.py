from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import secrets
from models import db



def create_app():
    app = Flask(__name__)


    # Configure Flask-Uploads for image uploads
    app.config['UPLOADED_PHOTOS_DEST'] = 'uploads'  # Folder to store uploaded images

    # Setup app configs
    secret_key = secrets.token_hex(16)
    app.config['SECRET_KEY'] = secret_key
    app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.json.compact = False
    return app
