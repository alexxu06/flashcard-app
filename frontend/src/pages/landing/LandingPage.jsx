import { useState } from 'react'
import './LandingPage.css'
import NavigationBar from '../../components/navigation-bar/NavigationBar'

function LandingPage() {

  return (
    <div className='landing-container'>
        <NavigationBar></NavigationBar>
        <p>This is the landing page</p>
    </div>
  )
}

export default LandingPage