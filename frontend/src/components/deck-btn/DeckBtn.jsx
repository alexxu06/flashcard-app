
function DeckBtn({ pdfName }) {
    // const clicked = (e, key) => {
    //     if (clicked_target != null) {
    //         const previous_target = clicked_target
    //         previous_target.style.backgroundColor = "#ACB1D6";
    //         previous_target.onmouseout = () => previous_target.style.backgroundColor = "#ACB1D6";
    //         previous_target.onmouseover = () => previous_target.style.backgroundColor = "#8294C4";
    //     }
    //     e.target.style.backgroundColor = "#8294C4";
    //     e.target.onmouseover = () => e.target.style.backgroundColor = "#8294C4";
    //     e.target.onmouseout = null;
    //     clicked_target = e.target
    // }

    

    return (
        <button className="pdf-sidebar">
            {pdfName}
        </button>
    )
}

export default DeckBtn