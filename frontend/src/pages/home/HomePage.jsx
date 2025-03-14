import { useState } from 'react'
import './HomePage.css'
import axios from "axios";

function HomePage() {
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
    <div className='home-container'>
        <p>hi</p>
        <button onClick={test}>test</button>
        <p>{testThing}</p>
    </div>
  )
}

export default HomePage