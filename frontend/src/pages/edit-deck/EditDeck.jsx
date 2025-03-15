import { useState } from 'react';
import './EditDeck.css';

function EditDeck(props) {
    let pdfName
    let cards
    if (props?.pdfName == undefined) { //No prop-types module so this is the default value, this could be changed into a function
        pdfName = 'Unnamed Pdf'
    } else {
        pdfName = props.pdfName
    }
    if (props?.cards == undefined) { //No prop-types module so this is the default value
        cards = []
    } else {
        cards = props.cards
    }
    const [cardList, setCardList] = useState(cards);

    const handleInputChange = (index, field, value) => {
        const newCards = [...cardList];
        newCards[index][field] = value;
        setCardList(newCards);
    };

    const cardElements = cardList.map((card, index) => (
        <div key={index} className="card">
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

    return (
        <div className="deck-container">
            <div className="central-container">
                <h2 className="pdfTitle">{pdfName}</h2>
                {cardElements}
            </div>
        </div>
    );
}

export default EditDeck;