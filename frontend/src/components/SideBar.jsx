import { useState } from "react";

function SideBar(props) {
    const currentPdfList = props.pdfList.map((pdf, index) => (
        <button key={index} className="pdf-sidebar">{pdf}</button>
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
