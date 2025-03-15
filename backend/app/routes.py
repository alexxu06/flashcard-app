from app import app, jwt, db
from flask import request, jsonify
from flask_jwt_extended import *
from app.models import User, Deck, Flashcard

import json

@app.route("/api/test")
def test():
    return jsonify({"test": "something"})

@app.route("/api/signup", method=["POST"])
def signup():
    return ""


@app.route("/api/login", method=["POST"])
def login():
    return ""

@app.route("/api/authentication")
@jwt_required()
def check_auth():
    return ""