import { useState } from 'react'
import './LandingPage.css'
import NavigationBar from '../../components/navigation-bar/NavigationBar'
import axios from "axios";

function LandingPage() {
    const [testThing, setTestThing] = useState([]);
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
                console.log("Flashcards Data Type:", typeof flashcards);
                console.log("Flashcards Content:", flashcards);

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
            });
    };

  return (
    <div className='landing-container'>
        <NavigationBar />
        <p>Welcome to SmartCard, the new best way to make flashcards!</p>
        <input type="file" onChange={handleFile} />
        <button type="submit" onClick={uploadFile}>Upload</button>

        <h2>Generated Flashcards</h2>
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
