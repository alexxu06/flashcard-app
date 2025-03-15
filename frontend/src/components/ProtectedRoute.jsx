import { Navigate } from 'react-router'
import { useEffect, useState } from 'react';
import axios from "axios"

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    async function checkIfAuthenticated() {
        await axios.get("/api/authentication", {
            withCredentials: true
        })
        .then(function (response) {
            console.log(response)
            setIsAuthorized(true)
        })
        .catch(function (error) {
            console.log(error)
            setIsAuthorized(false)
        })
    } 

    useEffect(() => {
        checkIfAuthenticated();
    }, [])

    if (isAuthorized == null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login"/>
}

export default ProtectedRoute