from app import app, jwt
from flask import request, jsonify
from flask_jwt_extended import *

import json

@app.route("/api/test")
def test():
    return jsonify({"test": "something"})
