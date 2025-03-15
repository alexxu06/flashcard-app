import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import HomePage from './pages/home/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/login/LoginPage'

function App() {

  return (
    <div>
        <Routes>
            <Route index element={<LandingPage />}/>
            <Route path="home" element={<HomePage />}/>
            <Route path="login" element={<LoginPage />}/>
        </Routes>
    </div>
  )
}

export default App
