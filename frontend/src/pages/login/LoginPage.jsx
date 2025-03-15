import './LoginPage.css'
import { useNavigate } from 'react-router'

function LoginPage() {

    let navigate = useNavigate(); 

    const SignupNav = () => {
        navigate("/signup")
    }

    return(
        <div className="login-container">
            <div className="login-box">
                <h1>SmartCard</h1>
                <p>Login to access your flashcards!</p>
                
                <div className="input-box">

                    <div class="input-container">
                        <input placeholder="Email" class="input-field" type="email"/>
                        <label for="input-field" class="input-label">Enter Email</label>
                        <span class="input-highlight"></span>
                    </div>

                    <div class="input-container">
                        <input placeholder="Password" class="input-field" type="password"/>
                        <label for="input-field" class="input-label">Enter Password</label>
                        <span class="input-highlight"></span>
                    </div>

                    <p className="signup-text">
                        Don’t have an account? <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={SignupNav}>Sign up</span>
                    </p>
                </div>

                <button className="login-button">Login</button>
            </div>

        </div>
    )
}

export default LoginPage