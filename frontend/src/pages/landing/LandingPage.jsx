import { useState } from 'react'
import './LandingPage.css'
import NavigationBar from '../../components/navigation-bar/NavigationBar'
import axios from "axios";

function LandingPage() {
    const [testThing, setTestThing] = useState("If successful, whatever backend returns will be here");

    const test = () => {
        axios.post("api/pdf-to-flashcard")
        .then(function (response) {
            console.log(response)
            setTestThing(response.data) // CHANGE THIS
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
        <button onClick={test}>This is a testing button</button>
        <p>{testThing}</p>
    </div>
  )
}

export default LandingPage