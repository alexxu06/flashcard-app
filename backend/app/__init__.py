from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)

app.config['SECRET_KEY'] = 'something'

jwt = JWTManager(app)
CORS(app, supports_credentials=True)

from app import routes, models