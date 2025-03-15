import { useState } from 'react';
import './ViewDeck.css';

function ViewDeck(props) {
    let pdfName;
    let cards;
    const [index, setIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false); // Tracks if answer is shown

    if (props?.pdfName == undefined) {
        pdfName = 'Unnamed Pdf';
    } else {
        pdfName = props.pdfName;
    }
    if (props?.cards == undefined) {
        cards = [
            {question: "Yo im a question", answer: "Yo im an answer"},
            {question: "Yo im another question", answer: "Yo im another answer"},
            {question: "wow you got to question three", answer: "impressive you got to answer 3"},
        ];
    } else {
        cards = props.cards;
    }

    // Function to switch cards while resetting answer view
    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % cards.length);
        setShowAnswer(false);
    };

    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
        setShowAnswer(false);
    };

    return (
        <div className="card-container">
            <div className="upper-box">
                <h1>{pdfName}</h1>
                <button>Edit</button>
            </div>
            <div className="card" onClick={() => setShowAnswer(!showAnswer)}>
                <h2>Card {index + 1}:</h2>
                <p className="cardText">
                    {showAnswer ? cards[index].answer : cards[index].question}
                </p>
            </div>
            <div className="card-navigation">
                <button onClick={handlePrev}>Previous</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}

export default ViewDeck;
