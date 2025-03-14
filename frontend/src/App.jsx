import { useState } from 'react'
import './App.css'
import HomePage from './pages/home/HomePage'
import axios from "axios";

function App() {
    const [testThing, setTestThing] = useState("");

    const test = () => {
        axios.get("api/test")
        .then(function (response) {
            console.log(response)
            setTestThing(response.data.test)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

  return (
    <div>
        <HomePage />
        <button onClick={test}>test</button>
        <p>{testThing}</p>
    </div>
  )
}

export default App
