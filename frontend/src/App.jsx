    import { useState } from 'react'
    import { Routes, Route } from 'react-router'
    import './App.css'
    import HomePage from './pages/home/HomePage'
    import ProtectedRoute from './components/ProtectedRoute'
    import LandingPage from './pages/landing/LandingPage';
    import LoginPage from './pages/login/LoginPage'
    import SignupPage from './pages/signup/SignupPage'
    import ViewDeck from './components/view-deck/ViewDeck'
    import StartAdding from './components/start-adding/StartAdding'

    function App() {

        return (
            <div>
                <Routes>
                    <Route index element={<LandingPage />}/>
                    <Route path="home" element={<ProtectedRoute><HomePage /><StartAdding /></ProtectedRoute>}/>
                    <Route path="home/:flashdeckId" element={<ProtectedRoute><HomePage /><ViewDeck /> </ProtectedRoute>}/>
                    <Route path="login" element={<LoginPage />}/>
                    <Route path="signup" element={<SignupPage />}/>
                </Routes>
            </div>
        )
    }

    export default App