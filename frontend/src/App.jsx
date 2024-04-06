import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
// import Navbar from './components/header/Navbar.component';
// import Footer from "./components/footer/Footer.component";

// Import your page components
import Login from './pages/login/Login.component';
import Home from './pages/home/LandingPage.component';
import Dashboard from './pages/dashboard/Dashboard.component';

// import Service from './pages/home/LandingPage.component';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />{/* Assuming you want / to redirect to Home */}
          {/* <Route path="/service" element={<Service />} /> */}
          // Add more routes here as needed
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
