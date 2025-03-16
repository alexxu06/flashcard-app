import { useState } from 'react';
import { useLocation } from 'react-router';
import './EditDeck.css';

function EditDeck(props) {
    const location = useLocation();
    const deck = location.state.deck
    let pdfName
    let cards

    if (deck.name == undefined) { //No prop-types module so this is the default value, this could be changed into a function
        pdfName = 'Unnamed Pdf'
    } else {
        pdfName = deck.name
    }
    if (deck.cards == undefined) { //No prop-types module so this is the default value
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

    const handleConfirm = () => {
        const userFlashCards = JSON.parse(localStorage.getItem("flashcards"))   
        userFlashCards[location.state.id] = {"cards": cardList, "name": deck.name}
        console.log(userFlashCards[location.state.id])
        localStorage.setItem("flashcards", JSON.stringify(userFlashCards));
        window.dispatchEvent(new Event("edit-flashcard"));
    }

    return (
        <div className="deck-container">
            <button onClick={handleConfirm} className="confirm-button">Confirm</button>
            <div className="central-container">
                <h2 className="pdfTitle">{pdfName}</h2>
                {cardElements}
            </div>
        </div>
    );
}

export default EditDeck;