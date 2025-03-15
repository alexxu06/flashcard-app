from sqlalchemy import ForeignKey, String, Integer, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app import db
from typing import Optional, List
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String, index=True, unique=True)
    email: Mapped[str] = mapped_column(String, index=True, unique=True)
    password: Mapped[Optional[str]] = mapped_column(String)

    flaskcard_decks = Mapped[list["Decks"]] = relationship("Decks", backref="user")

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return f"<User {self.username}>"

class Decks(db.Model):
    __tablename__ = "flaskcard_decks"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: mapped_column(String, index=True, unique=False)

    flaskcards = Mapped[list["Flaskcard"]] = relationship("Flaskcard", backref="deck")

    def __repr__(self):
        return f"<User {self.name}>"

class Flaskcard(db.Model):
    __tablename__ = "flaskcard"

    id: Mapped[int] = mapped_column(primary_key=True)
    front: mapped_column(String, index=True, unique=False)
    back: mapped_column(String, index=True, unique=False)

    def __repr__(self):
        return f"<User {self.name}>"