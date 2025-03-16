import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import './ViewDeck.css';

function ViewDeck() {
    let navigate = useNavigate();
    const location = useLocation();
    const { flashdeckId } = useParams();
    const deck = location.state?.deck || { name: "Unknown Deck", cards: [] }; 

    const [index, setIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false); // Tracks if answer is shown

    const cards = Array.isArray(deck.cards) && deck.cards.length > 0 
        ? deck.cards 
        : [
            { id: 1, question: "Sample Question 1", answer: "Sample Answer 1" },
            { id: 2, question: "Sample Question 2", answer: "Sample Answer 2" }
        ]; 

    // Function to switch cards while resetting answer view
    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % cards.length);
        setShowAnswer(false);
    };

    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
        setShowAnswer(false);
    };

    const editHandler = () => {
        const id = location.state.id
        navigate(`/home/${flashdeckId}/edit`, {
            state: {deck, id}
        });
    }

    return (
        <div className="card-container">
            <div className="upper-box">
                <h1>{deck.name}</h1>
                <button onClick={editHandler}>Edit</button>
            </div>
            {cards.length > 0 ? (
                <>
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
                </>
            ) : (
                <p>No flashcards in this deck.</p>
            )}
        </div>
    );
}

export default ViewDeck;
