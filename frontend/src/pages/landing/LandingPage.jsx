import { useState } from 'react'
import './LandingPage.css'
import NavigationBar from '../../components/navigation-bar/NavigationBar'
import axios from "axios";

function LandingPage() {
    const [testThing, setTestThing] = useState("If successful, whatever backend returns will be here");
    const [file, setFile] = useState(null)

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const uploadFile = () => {
        const formData = new FormData();
        console.log(file)
        formData.append('file', file)
        console.log(formData)
        axios.post("api/pdf-to-flashcard", formData, {
            headers: {
                'Content-Type': undefined,
            },
        })
        .then(function (response) {
            console.log(response)
            // setTestThing(response.data)
        })
        .catch(function (error) {
            console.log(error)
            setTestThing(error.message)
        })
    }

  return (
    <div className='landing-container'>
        <NavigationBar></NavigationBar>
        <p>Welcome to SmartCard, the new best way to make flashcards!</p>
        <input type="file" onChange={handleFile}></input>
        <button type="submit" onClick={uploadFile}>Upload</button>
        <p>{testThing}</p>
    </div>
  )
}

export default LandingPage