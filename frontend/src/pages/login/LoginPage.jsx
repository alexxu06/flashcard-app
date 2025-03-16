import './LoginPage.css'
import { useState } from "react";
import { useNavigate } from 'react-router'
import axios from "axios";

function LoginPage() {
    let navigate = useNavigate(); 
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const SignupNav = () => {
        navigate("/signup")
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const loadFlashCards = () => {
        axios.get("/api/flashcards", {
            withCredentials: true,
            headers: {
                "X-CSRF-TOKEN": getCookie("csrf_access_token"),
            },
        })
        .then((response) => {
            console.log("API Response:", response.data);

            if (Array.isArray(response.data.decks)) {
                localStorage.setItem("flashcards", JSON.stringify(response.data.decks))
                console.log(localStorage.getItem("load"))
            } else {
                console.error("Unexpected data format. Expected array of decks.");
            }
        })
        .catch((error) => {
            console.log("API Error:", error);
        });
    }

    const login = () => {
        if (email.trim() == "") {
            alert("Please enter an email");
        } else if (password.trim() == "") {
            alert("Please enter a password");
        } else {
            axios.post("/api/login", {
                email: email,
                password: password
            }, {
                withCredentials: true
            })
            .then(function (response) {
                console.log(response)
                loadFlashCards()
                navigate("/home")
            })
            .catch(function (error) {
                console.log(error)
                alert(error.response.data)
            })
        }
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return(
        <div className="login-container">
            <div className="login-box">
                <h1>SmartCard</h1>
                <p>Login to access your flashcards!</p>
                
                <div className="input-box">

                    <div className="input-container">
                        <input onChange={onEmailChange} placeholder="Email" className="input-field" type="email"/>
                        <label for="input-field" className="input-label">Enter Email</label>
                        <span className="input-highlight"></span>
                    </div>

                    <div className="input-container">
                        <input onChange={onPasswordChange} placeholder="Password" className="input-field" type="password"/>
                        <label for="input-field" className="input-label">Enter Password</label>
                        <span className="input-highlight"></span>
                    </div>

                    <p className="signup-text">
                        Don’t have an account? <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={SignupNav}>Sign up</span>
                    </p>
                </div>

                <button className="login-button" onClick={login}>Login</button>
            </div>

        </div>
    )
}

export default LoginPage