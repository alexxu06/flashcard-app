import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import './EditDeck.css';
import axios from "axios";

function EditDeck(props) {
    const location = useLocation();
    const { flashdeckId, id } = useParams();
    let navigate = useNavigate();

    const deck = location.state.deck;  // Assign 'deck' first
    const [pdfName, setPdfName] = useState(deck?.name || "Unnamed Pdf"); // Now we can safely use 'deck'

    let cards;

    if (deck.cards == undefined) { // No prop-types module so this is the default value
        cards = [
            {question: "Yo im a question", answer: "Yo im an answer"},
            {question: "Yo im another question", answer: "Yo im another answer"},
            {question: "wow you got to question three", answer: "impressive you got to answer 3"},
            {question: "wow you got to question three", answer: "impressive you got to answer 3"},
            {question: "wow you got to question three", answer: "impressive you got to answer 3"},
            {question: "wow you got to question three", answer: "impressive you got to answer 3"},
        ];
    } else {
        cards = Array.isArray(deck.cards) && deck.cards.length > 0 
        ? deck.cards 
        : [
            { id: 1, question: "Sample Question 1", answer: "Sample Answer 1" },
            { id: 2, question: "Sample Question 2", answer: "Sample Answer 2" }
        ]; 
    }

    const [cardList, setCardList] = useState(cards);

    const handleInputChange = (index, field, value) => {
        const newCards = [...cardList];
        newCards[index][field] = value;
        setCardList(newCards);
    };

    const cardElements = cardList.map((card, index) => (
        <div key={index} className="card1">
            <textarea
                className="question"
                value={card.question}
                onChange={(e) => handleInputChange(index, 'question', e.target.value)}/>  
            <textarea
                className="answer"
                value={card.answer}
                onChange={(e) => handleInputChange(index, 'answer', e.target.value)}/>
        </div>
    ));

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const handleConfirm = () => {
        const userFlashCards = JSON.parse(localStorage.getItem("flashcards"))   
        userFlashCards[location.state.id] = {"cards": cardList, "id": deck.id,"name": pdfName}
        console.log(userFlashCards[location.state.id])
        localStorage.setItem("flashcards", JSON.stringify(userFlashCards));
        window.dispatchEvent(new Event("edit-flashcard"));

        axios.post("/api/edit", {
            id: deck.id,
            deck: {"cards": cardList, "id": deck.id,"name": pdfName}
        }, {
            withCredentials: true,
            headers: {
                "X-CSRF-TOKEN": getCookie("csrf_access_token"),
            },
        })
        .then(async function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
            alert(error.response.data)
        })
        window.dispatchEvent(new Event("edit-flashcard"));
        navigate(`/home/${flashdeckId}`, {
            state: {deck, id}
        });
    }

    const handleDelete = () => {
        // Remove the deck from localStorage
        const userFlashCards = JSON.parse(localStorage.getItem("flashcards"));
        console.log(userFlashCards[location.state.id])
        delete userFlashCards[location.state.id]; // Delete the deck by its ID
        console.log(userFlashCards)
        localStorage.setItem("flashcards", JSON.stringify(userFlashCards));
        window.dispatchEvent(new Event("edit-flashcard"));

        // Optionally, you could delete it from the server as well
        axios.post("/api/delete", { id: deck.id }, {
            withCredentials: true,
            headers: {
                "X-CSRF-TOKEN": getCookie("csrf_access_token"),
            },
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            alert(error.response.data);
        });

        // Redirect to home or a list of decks
        navigate(`/home`);
    };

    return (
        <div className="deck-container">
            <div className="button-container">
                <button onClick={handleConfirm} className="confirm-button">Confirm</button>
                <button onClick={handleDelete} className="delete-button">Delete</button>
            </div>
            <div className="central-container">
                <textarea 
                    spellCheck="false" 
                    value={pdfName} 
                    className="pdfTitle"
                    onChange={(e) => setPdfName(e.target.value)} />
                {cardElements}
            </div>
        </div>
    );
}

export default EditDeck;
