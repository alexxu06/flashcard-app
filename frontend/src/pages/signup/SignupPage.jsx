import "../login/LoginPage.css"
import { useNavigate } from 'react-router'

function SignupPage() {
    let navigate = useNavigate(); 

    const LoginNav = () => {
        navigate("/login")
    }

    return(
        <div className="login-container">
            <div className="login-box">
                <h1>SmartCard</h1>
                <p>Sign up to start creating flashcards!</p>
                
                <div className="input-box">

                    <div class="input-container">
                        <input placeholder="Email" class="input-field" type="email"/>
                        <label for="input-field" class="input-label">Enter Email</label>
                        <span class="input-highlight"></span>
                    </div>

                    <div class="input-container">
                        <input placeholder="Username" class="input-field" type="text"/>
                        <label for="input-field" class="input-label">Enter Username</label>
                        <span class="input-highlight"></span>
                    </div>

                    <div class="input-container">
                        <input placeholder="Password" class="input-field" type="password"/>
                        <label for="input-field" class="input-label">Enter Password</label>
                        <span class="input-highlight"></span>
                    </div>

                    <p className="signup-text">
                        Already have an account? <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={LoginNav}>Login</span>
                    </p>
                </div>

                <button className="login-button">Sign up</button>
            </div>

        </div>
    )
}

export default SignupPage