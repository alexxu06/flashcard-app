import { useEffect, useState } from 'react'
import './NavigationBar.css/'
import axios from "axios";
import { useNavigate } from 'react-router'

function NavigationBar() {
    let navigate = useNavigate();
    // const [isAuthorized, setIsAuthorized] = useState(null);
    const [btnLabel, setBtnLabel] = useState("");

    const checkIfAuthenticated = () => {
        axios.get("api/authentication")
        .then(function (response) {
            console.log(response)
            // setIsAuthorized(true)
            setBtnLabel("Logout")
        })
        .catch(function (error) {
            console.log(error)
            // setIsAuthorized(false)
            setBtnLabel("Sign Up / Login")
        })
    }

    useEffect(() => {
        checkIfAuthenticated()
    }, [])

    const loginNav = () => {
        navigate("/login")
    }

    return (
        <div className='navigation-bar'>
            <div className='title'>SmartCard</div>
            <div className='padding'></div>
            <button className='signup-login-button' onClick={loginNav}>{btnLabel}</button>
        </div>
    )
}

export default NavigationBar