import { useState } from 'react'
import './LandingPage.css'
import NavigationBar from '../../components/navigation-bar/NavigationBar'

function LandingPage() {

  return (
    <div className='landing-container'>
        <NavigationBar></NavigationBar>
        <p>Welcome to SmartCard, the new best way to make flashcards!</p>
    </div>
  )
}

export default LandingPage