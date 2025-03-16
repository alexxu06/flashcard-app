import "../login/LoginPage.css"
import { useState } from "react";
import { useNavigate } from 'react-router'
import axios from "axios";

function SignupPage() {
    let navigate = useNavigate(); 

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const LoginNav = () => {
        navigate("/login")
    }

    const signup = () => {
        if (email.trim() == "") {
            alert("Please enter an email");
        } else if (username.trim() == "") {
            alert("Please enter a username");
        } else if (password.trim() == "") {
            alert("Please enter a password");
        } else {
            axios.post("/api/signup", {
                email: email,
                username: username,
                password: password
            }, {
                withCredentials: true
            })
            .then(function (response) {
                console.log(response)
                localStorage.setItem("flashcards", JSON.stringify([]))
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

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return(
        <div className="login-container">
            <div className="login-box">
                <h1>SmartCard</h1>
                <p>Sign up to start creating flashcards!</p>
                
                <div className="input-box">

                    <div className="input-container">
                        <input onChange={onEmailChange} placeholder="Email" className="input-field" type="email"/>
                        <label for="input-field" className="input-label">Enter Email</label>
                        <span className="input-highlight"></span>
                    </div>

                    <div className="input-container">
                        <input onChange={onUsernameChange} placeholder="Username" className="input-field" type="text"/>
                        <label for="input-field" className="input-label">Enter Username</label>
                        <span className="input-highlight"></span>
                    </div>

                    <div className="input-container">
                        <input onChange={onPasswordChange} placeholder="Password" className="input-field" type="password"/>
                        <label for="input-field" className="input-label">Enter Password</label>
                        <span className="input-highlight"></span>
                    </div>

                    <p className="signup-text">
                        Already have an account? <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={LoginNav}>Login</span>
                    </p>
                </div>

                <button className="login-button" onClick={signup}>Sign up</button>
            </div>

        </div>
    )
}

export default SignupPage