import { useState } from "react";

function SideBar(props) {
    let pdfList
    if (props?.props == undefined) { //No prop-types module so this is the default value
        pdfList = []
    } else {
        pdfList = props.pdfList
    }
    let clicked_target = null;
    const clicked = (e, pdfName) => {
        if (clicked_target != null) {
            const previous_target = clicked_target
            previous_target.style.backgroundColor = "#ACB1D6";
            previous_target.onmouseout = () => previous_target.style.backgroundColor = "#ACB1D6";
            previous_target.onmouseover = () => previous_target.style.backgroundColor = "#8294C4";
        }
        e.target.style.backgroundColor = "#8294C4";
        e.target.onmouseover = () => e.target.style.backgroundColor = "#8294C4";
        e.target.onmouseout = null;
        clicked_target = e.target
    }

    const currentPdfList = pdfList.map((pdfName, index) => (
        <button onClick={(e, pdfName) => clicked(e, pdfName)} key={index} className="pdf-sidebar">{pdfName}</button>
    ));

    return (
        <div className="container">
            <div className="side-bar">
                <p className="decks-space">Decks</p>
                <hr />
                <div className="scrollable-section">
                    {currentPdfList}
                </div>
                <button className="add-new-decks">Add new decks +</button>
            </div>
        </div>
    );
}

export default SideBar;
