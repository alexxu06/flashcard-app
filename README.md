# SmartCard – The Ultimate Study Companion

## AI-Powered Flashcards for Smarter Learning.   

SmartCard is designed to help students save time and boost retention by transforming study materials into AI-generated flashcards effortlessly. It features:

- AI-Generated Flashcards – Converts PDFs into effective Q&A flashcards
- User Authentication – Secure login/signup system
- Deck Management – Create, update, and delete flashcards and decks
- Local Storage Support – Saves flashcards to local storage for quick access
- Responsive Design – Works on desktop and mobile

# 📦 Installation   

### 1. Clone the Repository

- git clone https://github.com/alexxu06/flashcard-app.git
- cd flashcard-app
- cd backend
---
### 2. Create and Activate a Virtual Environment

python -m venv venv
#### Windows:
venv\Scripts\activate 
#### macOS/Linux:
source venv/bin/activate

---
### 3. Install Dependencies

pip install -r requirements.txt

---
### 4. Set Up the Database

- flask db init
- flask db migrate -m "Initial migration"
- flask db upgrade

---
### 5. Run the Backend Server using run.py

python run.py

By default, the server runs on http://127.0.0.1:5000.

---
### 6. Initialize the Frontend Server (Node.js required)

- cd ..
- cd frontend
- npm install
- npm run dev

---
### 🛠 Technologies Used

- Python
- Flask
- Flask-SQLAlchemy (Flask's local database)
- OpenAI API
- CSS
- React
- Javascript

---
###  💡 Common Issues & Fixes 
- If you get "no such table" errors, ensure you run flask db upgrade.
- If Flask isn't recognized in your terminal, try python -m flask run.


