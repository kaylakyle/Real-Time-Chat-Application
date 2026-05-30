import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'
import React from 'react'

import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

import { Loader } from "lucide-react";

const App = () => {
    const { authUser, checkAuth } = useAuthStore();

     useEffect(() => {
    checkAuth();
  }, [checkAuth]);

   console.log({ authUser });

    if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

   //index.js instal cors  the import cors from "cors"
 // app.use(
 // cors({
 //   origin: "http://localhost:5173",
 //   credentials: true,
 // })
//); install lucide react frontend

  return (
    <div >
      <Navbar/>

       <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      
       <Toaster />
    </div>
  )
}

export default App
