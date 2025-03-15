import './LoginPage.css'

function LoginPage() {

    return(
        <div className="login-container">
            <div className="login-box">
                <h1>SmartCard</h1>
                <p>Login to access your flashcards!</p>
                
                <div className="input-box">
                    <input 
                        type="email" 
                        placeholder="Email" 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                    />
                    <p className="signup-text">
                        Don’t have an account? <span style={{ textDecoration: "underline", cursor: "pointer" }}>Sign up</span>
                    </p>
                </div>

                <button className="login-button">Login</button>
            </div>

        </div>
    )
}

export default LoginPage