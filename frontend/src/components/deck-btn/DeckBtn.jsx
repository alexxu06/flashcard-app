import { useNavigate } from "react-router";

function DeckBtn({ pdfName, id, onClick }) {
    let navigate = useNavigate();

    const flashDeckNav = (e) => {
        onClick(e); // Call the parent's `clicked` function
        navigate(`/home/${id}`, { state: { pdfName } });
    };

    return (
        <button onClick={flashDeckNav} className="pdf-sidebar">
            {pdfName}
        </button>
    );
}

export default DeckBtn;
