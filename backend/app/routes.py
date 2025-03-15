from app import app, jwt, db
from flask import request, jsonify
from flask_jwt_extended import *
from app.models import User, Deck, Flashcard
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta, timezone
from app import gpt
import os
import json

@app.after_request
def refresh_expiring_tokens(response):
    try:
        expiration_time = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        time_to_refresh = datetime.timestamp(now + timedelta(minutes=0.2)) # change later
        if time_to_refresh > expiration_time:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        return response

@app.route("/api/test")
def test():
    return jsonify({"test": "something"})

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    email = jwt_data["sub"]
    return User.query.filter_by(email=email).one_or_none()

# Signup route
@app.route("/api/signup", methods=["POST"])
def signup():
    email = request.json.get("email", None)
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if User.query.filter(User.username==username).first():
        return "Username taken", 401
    
    if User.query.filter(User.email==email).first():
        return "Email already in use", 401
    
    user = User(email=email, username=username, admin=admin)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    response = jsonify({"msg": "successfully signed up"})
    access_token = create_access_token(identity=user.email)
    set_access_cookies(response, access_token)

    return response

# Login route
@app.route("/api/login", methods=["POST"])
def login():
    email = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter(User.email==email).one_or_none()

    if not user:    
        return "User does not exist", 401

    if not user.check_password(password):
        return "Wrong password", 401

    response = jsonify({"msg": "successfully logged in"})
    access_token = create_access_token(identity=user.email)
    set_access_cookies(response, access_token)
    return response

# Logout route
@app.route("/api/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successfully"})
    unset_jwt_cookies(response)
    return response

@app.route("/api/authentication")
@jwt_required()
def check_auth():
    return jsonify({"msg": "success"})

# Get pdf 
@app.route("/api/pdf-to-flashcard", methods=["POST"])
# @jwt_required()  # Ensure the user is authenticated before uploading a PDF
def generate_flashcards_from_pdf():
    pdf_file = request.files['file']
    print(pdf_file)

    if not pdf_file:
        return jsonify({"error": "PDF file not attached"}), 400

    filename = secure_filename(pdf_file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    pdf_file.save(file_path)

    result = gpt.process_pdf(file_path)
    print(result)

    return jsonify({"gpt_results": result})