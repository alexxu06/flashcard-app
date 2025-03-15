import { useState } from 'react'
import './LandingPage.css'
import NavigationBar from '../../components/navigation-bar/NavigationBar'
import LandingCard from '../../components/landing-cards/LandingCard';
import axios from "axios";

function LandingPage() {
    const [testThing, setTestThing] = useState([]);
    const [deckName, setDeckName] = useState("Your Deck");
    const [file, setFile] = useState(null)

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const uploadFile = () => {
        const formData = new FormData();
        console.log(file);
        formData.append('file', file);
        console.log(formData);

        axios.post("api/pdf-to-flashcard", formData)
            .then(function (response) {
                console.log("API Response:", response);

                const flashcards = response.data.gpt_results;
                const deck_name = response.data.deck_name;

                // Remove file extension '.pdf' from deck name
                const cleanDeckName = deck_name.replace(/\.[^/.]+$/, "");
                setDeckName(cleanDeckName || "Your Deck");

                if (Array.isArray(flashcards)) {
                    setTestThing(flashcards);  
                } else {
                    setTestThing([]); 
                    console.error("Unexpected data format. Expected array.");
                }
            })
            .catch(function (error) {
                console.log("API Error:", error);
                setTestThing([]);
                setDeckName("Your Deck");
            });
    };

  return (
    <div className='landing-container'>
        <NavigationBar />
        <h2 className="landing-title">Welcome to SmartCard, the new best way to make flashcards!</h2>
        
        <div className='landing-cards'>
            <LandingCard
                imgLink="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Eo_circle_red_number-1.svg/800px-Eo_circle_red_number-1.svg.png"
                header="Sign Up"
                paragraph="Create your own SmartCard account by clicking the button below"
            />
            <LandingCard
                imgLink="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Eo_circle_yellow_number-2.svg/768px-Eo_circle_yellow_number-2.svg.png?20200417183535" 
                header="Upload"
                paragraph="Submit your notes, textbooks, or other schoolwork to SmartCard in PDF format"
            />
            <LandingCard
                imgLink="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Eo_circle_green_number-3.svg/768px-Eo_circle_green_number-3.svg.png?20200417133104"
                header="Voila!"
                paragraph="We'll automatically create flashcards from the PDFs you upload that will help you study for the exams you dread!"
            />
        </div>

        <button className="signup-button">Sign Up</button>

        <input type="file" onChange={handleFile} />
        <button type="submit" onClick={uploadFile}>Upload</button>

        <h2>Generated Flashcards for {deckName}</h2>
        {Array.isArray(testThing) && testThing.length > 0 ? (
            testThing.map((card, index) => (
                <div key={index} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
                    <h3>Q: {card.question}</h3>
                    <p>A: {card.answer}</p>
                </div>
            ))
        ) : (
            <p>No flashcards generated yet.</p>
        )}
    </div>
  )
}

export default LandingPage
