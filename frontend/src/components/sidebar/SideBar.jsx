import { useState } from "react";
import './SideBar.css/'
import DeckBtn from "../deck-btn/DeckBtn";


function SideBar(props) {
    const [flashCardList, setFlashCardList] = useState([])
    const [a, setA] = useState(0)

    const addDeck = () => {
        setFlashCardList(flashCards => [...flashCards, a])
        setA(prevA => prevA+1)
    }

    return (
        <div className="container">
            <div className="side-bar">
                <p className="decks-space">Decks</p>
                <hr />
                <div className="scrollable-section">
                    {flashCardList.map((flashcard, index) => {
                        return <DeckBtn key = {index} pdfName = {flashcard} id = {index}/>
                    })}
                </div>
                <button onClick={addDeck} className="add-new-decks">Add new decks +</button>
            </div>
        </div>
    );
}

export default SideBar;
