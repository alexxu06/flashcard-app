from sqlalchemy import ForeignKey, String, Integer, Boolean

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app import db

from typing import Optional, List

from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):

    __tablename__ = "user_table"

    id: Mapped[int] = mapped_column(primary_key=True)

    username: Mapped[str] = mapped_column(String, index=True, unique=True)

    email: Mapped[str] = mapped_column(String, index=True, unique=True)

    password: Mapped[Optional[str]] = mapped_column(String)

    flashcard_decks: Mapped[List["Deck"]] = relationship("Deck", backref="user")


    def set_password(self, password):

        self.password = generate_password_hash(password)


    def check_password(self, password):

        return check_password_hash(self.password, password)

    def __repr__(self):

        return f"<User {self.username}>"


class Deck(db.Model):

    __tablename__ = "deck_table"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(String, index=True, unique=False)

    user_id: Mapped[int] = mapped_column(ForeignKey("user_table.id"), index=True)


    flashcards: Mapped[List["Flashcard"]] = relationship("Flashcard", backref="deck", cascade="all, delete-orphan")

    def __repr__(self):

        return f"<User {self.name}>"


class Flashcard(db.Model):

    __tablename__ = "flashcard_table"

    id: Mapped[int] = mapped_column(primary_key=True)

    front: Mapped[str] = mapped_column(String, index=True, unique=False)

    back: Mapped[str] = mapped_column(String, index=True, unique=False)

    deck_id: Mapped[int] = mapped_column(ForeignKey("deck_table.id"), index=True)

    def __repr__(self):

        return f"<User {self.front}>"