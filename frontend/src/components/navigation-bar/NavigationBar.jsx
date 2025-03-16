import { useEffect, useState } from 'react'
import './NavigationBar.css/'
import axios from "axios";
import { useNavigate } from 'react-router'
import User from './svg/user.svg'

function NavigationBar(props) {
    let navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [btnLabel, setBtnLabel] = useState("");

    const checkIfAuthenticated = () => {
        axios.get("api/authentication")
        .then(function (response) {
            console.log(response)
            // setIsAuthorized(true)
            setBtnLabel("Logout")
            setIsAuthorized(true)
        })
        .catch(function (error) {
            console.log(error)
            // setIsAuthorized(false)
            setBtnLabel("Login")
            setIsAuthorized(false)
        })
    }

    useEffect(() => {
        checkIfAuthenticated()
    }, [])

    const loginNav = () => {
        navigate("/login")
    }

    const logout = () => {
        axios.post("/api/logout", {
            withCredentials: true
        })
        .then(function (response) {
            localStorage.clear()
            window.location.reload()
        })
        .catch(function (error) {
            alert(error.response.data);
        });
    }

    return (
        <div className='navigation-bar'>
            <div className='title'>SmartCard</div>
            <div className='padding'></div>
            <button className='landing-page-login-button' onClick={isAuthorized? logout : loginNav}><img src={User} width={25}/> {btnLabel}</button>
        </div>
    )
}

export default NavigationBar