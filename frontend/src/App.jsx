import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import your page components
import Login from './pages/auth/login/Login.component';
import Home from './pages/home/LandingPage.component';
import Dashboard from './pages/dashboard/Dashboard.component';
import Signup from "./pages/auth/signup/Signup.component"
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />{/* Assuming you want / to redirect to Home */}
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
