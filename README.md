# flashcard-app
SmartCard

This is a flashcard website built using Flask, SQLAlchemy, ReactJS, etc.

🚀 Features

User authentication (Signup/Login)

Create, update, and delete flashcards

Categorization and tagging of flashcards

RESTful API endpoints with JSON responses

📦 Installation

1️⃣ Clone the Repository

git clone https://github.com/alexxu06/flashcard-app.git
cd flashcard-app
cd backend

2️⃣ Create and Activate a Virtual Environment

python -m venv venv
# Activate it:
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

3️⃣ Install Dependencies

pip install -r requirements.txt

4️⃣ Set Up the Database

flask db init
flask db migrate -m "Initial migration"
flask db upgrade

5️⃣ Run the Backend Server using run.py

python run.py

By default, the server runs on http://127.0.0.1:5000.

6️⃣ Initialize the Frontend Server (Node.js required)

cd ..
cd frontend
npm install
npm run dev

🛠 Technologies Used

Python

Flask

Flask-SQLAlchemy

SQLite

Flask-Migrate

Flask-CORS

📌 Notes

If you get "no such table" errors, ensure you run flask db upgrade.

If Flask isn't recognized in your terminal, try python -m flask run.