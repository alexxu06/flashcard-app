import { useState } from 'react'
import './LandingPage.css'
import NavigationBar from '../../components/navigation-bar/NavigationBar'
import LandingCard from '../../components/landing-cards/LandingCard';
import axios from "axios";
import Voila from "./svg/voila.svg";
import Files from "./svg/files.svg";
import Account from "./svg/account.svg";


function LandingPage() {
    const [decks, setDecks] = useState([]);
    const [file, setFile] = useState(null);

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const uploadFile = () => {
        const formData = new FormData();
        console.log(file);
        formData.append("file", file);
        console.log(formData);

        axios.post("/api/flashcards", formData, {
            withCredentials: true,
            headers: {
                "X-CSRF-TOKEN": getCookie("csrf_access_token"),
            },
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log("API Error:", error);
        });
    };

    const fetchFlashcards = () => {
        axios.get("/api/flashcards", {
            withCredentials: true,
            headers: {
                "X-CSRF-TOKEN": getCookie("csrf_access_token"),
            },
        })
        .then((response) => {
            console.log("API Response:", response.data);

            if (Array.isArray(response.data.decks)) {
                setDecks(response.data.decks);
            } else {
                setDecks([]);
                console.error("Unexpected data format. Expected array of decks.");
            }
        })
        .catch((error) => {
            console.log("API Error:", error);
            setDecks([]);
        });
    };


    return (
        <div className="landing-container">
            <NavigationBar />

            <h2 className="landing-title">SmartCard. The new way to make flashcards.</h2>

            <div className="landing-cards">
                <LandingCard
                    imgLink={<img src={Account} alt="Account" />}
                    header="Create an Account"
                    paragraph="Sign up to SmartCard by clicking the button below"
                />
                <LandingCard
                    imgLink={<img src={Files} alt="Files" />}
                    header="Upload your Notes"
                    paragraph="Submit your notes, textbooks, or other schoolwork to SmartCard in PDF format"
                />
                <LandingCard
                    imgLink={<img src={Voila} alt="Voila" />}
                    header="Voila!"
                    paragraph="We automatically create succinct and effective flashcards for you to study"
                />
            </div>

            <button className="signup-button">Sign Up</button>

            <input type="file" onChange={handleFile} />
            <button type="submit" onClick={uploadFile}>Upload</button>
            <button type="submit" onClick={fetchFlashcards}>Get Flashcards</button>

            <h2>Generated Flashcards</h2>
            {decks.length > 0 ? (
                decks.map((deck, deckIndex) => (
                    <div key={deckIndex} style={{ border: "2px solid black", padding: "15px", marginBottom: "20px" }}>
                        <h3>Deck: {deck.name}</h3>
                        {deck.cards.length > 0 ? (
                            deck.cards.map((card, cardIndex) => (
                                <div key={cardIndex} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
                                    <h4>Q: {card.question}</h4>
                                    <p>A: {card.answer}</p>
                                </div>
                            ))
                        ) : (
                            <p>No flashcards in this deck.</p>
                        )}
                    </div>
                ))
            ) : (
                <p>No decks available yet.</p>
            )}
        </div>
    );
}

export default LandingPage;