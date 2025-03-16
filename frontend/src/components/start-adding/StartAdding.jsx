import { useState } from "react";
import "./StartAdding.css";
import axios from "axios";

function StartAdding() {
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
    <div className="start-adding-container">
      <div className="header">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        <p>Upload PDF!</p>
      </div>

      <label htmlFor="file" className="footer">
        <div className="footer-icon">
          <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
            <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
          </svg>
        </div>

        <div className="footer-text">
          <p>{file ? file.name : "No file selected"}</p>
        </div>

        <div className="footer-spacer" />
      </label>

      <input id="file" type="file" onChange={handleFile} hidden />

      <button onClick={uploadFile} className="upload-button">Upload</button>
      <button onClick={fetchFlashcards} className="fetch-button">Get Flashcards</button>

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

export default StartAdding;
