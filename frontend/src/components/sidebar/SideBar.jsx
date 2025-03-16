import { useState, useEffect } from "react";
import "./SideBar.css/";
import DeckBtn from "../deck-btn/DeckBtn";
import axios from "axios";
import { useNavigate } from 'react-router'

function SideBar() {
    let navigate = useNavigate();
    const [deckList, setdeckList] = useState([]);
    const [clickedTarget, setClickedTarget] = useState(null); // Store clicked button reference

    const clicked = (e) => {
        if (clickedTarget) {
            const clicked_target =  clickedTarget
            clicked_target.style.backgroundColor = "#ACB1D6";
            clicked_target.onmouseout = () => (clicked_target.style.backgroundColor = "#ACB1D6");
            clicked_target.onmouseover = () => (clicked_target.style.backgroundColor = "#8294C4");
        }

        const newTarget = e.target; // Get the clicked button
        newTarget.style.backgroundColor = "#8294C4";
        newTarget.onmouseover = () => (newTarget.style.backgroundColor = "#8294C4");
        newTarget.onmouseout = null;
        setClickedTarget(newTarget); // Store new clicked button
    };

    const addHomeNav = () => {
        if (clickedTarget) {
            const clicked_target =  clickedTarget 
            clicked_target.style.backgroundColor = "#ACB1D6";
            clicked_target.onmouseout = () => (clicked_target.style.backgroundColor = "#ACB1D6");
            clicked_target.onmouseover = () => (clicked_target.style.backgroundColor = "#8294C4");
            setClickedTarget(null)
        }
        navigate("/home")
    };

    useEffect(() => {
        const userFlashCards = JSON.parse(localStorage.getItem("flashcards"))   
        const listOfLoadedDecks = []

        userFlashCards.forEach(deck => {
            listOfLoadedDecks.push(deck)
        })

        setdeckList(listOfLoadedDecks)
    }, [])

    return (
        <div className="container">
            <div className="side-bar">
                <p className="decks-space">Decks</p>
                <hr />
                <div className="scrollable-section">
                    {deckList.map((deck, index) => (
                        <DeckBtn key={index} deck={deck} id={index} onClick={clicked} />
                    ))}
                </div>
                <button onClick={addHomeNav} className="add-new-decks">
                    Add new decks +
                </button>
            </div>
        </div>
    );
}

export default SideBar;