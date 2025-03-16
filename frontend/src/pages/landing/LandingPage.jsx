import { useState } from 'react'
import './LandingPage.css'
import NavigationBar from '../../components/navigation-bar/NavigationBar'
import LandingCard from '../../components/landing-cards/LandingCard';
import axios from "axios";
import Voila from "./svg/voila.svg";
import Files from "./svg/files.svg";
import Account from "./svg/account.svg";


function LandingPage() {
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

        </div>
    );
}

export default LandingPage;