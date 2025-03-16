import { useNavigate } from "react-router";

function DeckBtn({ deckName, id, onClick }) {
    let navigate = useNavigate();

    const flashDeckNav = (e) => {
        onClick(e); // Call the parent's `clicked` function
        navigate(`/home/${id}`, { state: { deckName } });
    };

    return (
        <button onClick={flashDeckNav} className="pdf-sidebar">
            {deckName}
        </button>
    );
}

export default DeckBtn;
