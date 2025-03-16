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
    
    user = User(email=email, username=username)
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
    email = request.json.get("email", None)
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
@app.route("/api/flashcards", methods=["GET", "POST"])
@jwt_required()  # Ensure the user is authenticated before uploading a PDF
def flashcards():
    # Get current user ID from token
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).one_or_none()

    if not user:
        return jsonify({"error": "User not found"}), 404

    if request.method == "GET":
        # Fetch user's decks
        user_decks = user.flashcard_decks

        # Convert decks and their flashcards into a structured JSON format
        flashcards_dict = {
        "decks": [
            {
                "id": deck.id,  # Added deck ID here
                "name": deck.name,
                "cards": [
                    {
                        "id": card.id,
                        "question": card.front,
                        "answer": card.back
                    } for card in deck.flashcards
                ]
            }
            for deck in user_decks
        ]}   

        # print(flashcards_dict)
        
        return jsonify(flashcards_dict)

    elif request.method == "POST":
        pdf_file = request.files['file']

        if not pdf_file:
            return jsonify({"error": "PDF file not attached"}), 400

        filename = secure_filename(pdf_file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        pdf_file.save(file_path)

        try:
            result = gpt.process_pdf(file_path)
        finally:
            # Ensures the pdf files gets deleted after processing (even if processing fails)
            if os.path.exists(file_path):
                os.remove(file_path)

        # Get current user ID from token
        current_user_id = get_jwt_identity()

        user = User.query.filter(User.email==current_user_id).one_or_none()
        if user is None:
            return jsonify({"error": "User not found"}), 404

        # Clean filename (remove .pdf)
        deck_name = filename.rsplit(".", 1)[0]

        # Save deck
        new_deck = Deck(name=deck_name, user_id=user.id)

        # Save flashcards to Deck
        new_flashcards = []
        for card in result:
            new_card = Flashcard(front=card['question'], back=card['answer'], deck_id=new_deck.id)
            db.session.add(new_card)  # is this necessary?
            new_flashcards.append(new_card)
            
        new_deck.flashcards.extend(new_flashcards)
        
        db.session.add(new_deck)
        db.session.commit()

        result = [{
            "id": new_deck.id,  # Added deck ID here
            "name": filename,
            "cards": [
                {
                    "id": card.id,
                    "question": card.front,
                    "answer": card.back
                } for card in new_deck.flashcards
            ]
        }]

        return jsonify(result)

@app.route("/api/edit", methods=["POST"])
@jwt_required()  # Ensure the user is authenticated before uploading a PDF
def edit():
    deck_id = request.json.get("id", None)
    deck = request.json.get("deck", None)

    new_name = deck.get("name", None)
    new_flashcards = deck.get("cards", None)

    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).one_or_none()
    user_id = user
    if not user:
        return jsonify({"error": "User not found"}), 404

    current_deck = Deck.query.filter_by(id=deck_id, user_id=user.id).one_or_none()

    if not current_deck:
        return jsonify({"error": "Deck not found or does not belong to the user"}), 404

    current_deck.name = new_deck

    print(deck)

    for card in current_deck.flashcards:
        print(card)

    return jsonify({"msg": "success"})