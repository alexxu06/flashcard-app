import { useState } from "react";
import "./SideBar.css/";
import DeckBtn from "../deck-btn/DeckBtn";

function SideBar() {
    const [pdfNameList, setpdfNameList] = useState([]);
    const [a, setA] = useState(0);
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

    const addDeck = () => {
        setpdfNameList((pdfNames) => [...pdfNames, `pdfName ${a + 1}`]);
        setA((prevA) => prevA + 1);
    };

    return (
        <div className="container">
            <div className="side-bar">
                <p className="decks-space">Decks</p>
                <hr />
                <div className="scrollable-section">
                    {pdfNameList.map((pdfName, index) => (
                        <DeckBtn key={index} pdfName={pdfName} id={index} onClick={clicked} />
                    ))}
                </div>
                <button onClick={addDeck} className="add-new-decks">
                    Add new decks +
                </button>
            </div>
        </div>
    );
}

export default SideBar;
