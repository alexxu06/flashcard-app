from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

app.config['SECRET_KEY'] = 'something'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=10) # short for testing purposes

db = SQLAlchemy(app)
migrate = Migrate(app)
jwt = JWTManager(app)
CORS(app, supports_credentials=True)

from app import routes, models