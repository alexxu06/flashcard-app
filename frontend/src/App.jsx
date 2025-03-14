import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import HomePage from './pages/home/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/landing/LandingPage';

function App() {

  return (
    <div>
        <Routes>
            <Route index element={<LandingPage />}/>
            <Route path="home" element={<HomePage />}/>
        </Routes>
    </div>
  )
}

export default App
