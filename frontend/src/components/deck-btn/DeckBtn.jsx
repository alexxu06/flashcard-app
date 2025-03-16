import { useNavigate } from "react-router";

function DeckBtn({ deck, id, onClick }) {
    let navigate = useNavigate();

    const flashDeckNav = (e) => {
        onClick(e); // Call the parent's `clicked` function
        navigate(`/home/${id}`, { state: { deck, id } });
    };

    return (
        <button onClick={flashDeckNav} className="pdf-sidebar">
            {deck.name}
        </button>
    );
}

export default DeckBtn;
