import { useState, useEffect } from 'react'
import {BrowserRouter, Route, Routes, Navigate, useNavigate} from 'react-router-dom'
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx";
import LandingPage from './pages/LandingPage.jsx';
import LoginModal from './components/LoginModal.jsx';
import HomePage from "./pages/HomePage.jsx"
import ServicePage from "./pages/ServicesPage.jsx"
import BuyPage from "./pages/BuyPage.jsx";
import SellPage from "./pages/SellPage.jsx";
import WishPage from "./pages/WishPage.jsx";
import FAQ from "./pages/FAQ.jsx";
import './App.css';

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
    navigate('/home');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('staffno');
    localStorage.removeItem('name');
    setIsAuthenticated(false);
    navigate('/');
  }

  return (
    <>
      <div className='main'>
        <Navbar className="navbar" showLogin={!isAuthenticated} onLogin={()=> setShowLoginModal(true)} onLogout={handleLogout}/>
        <div className="content">
          <Routes>
            <Route path="/" element={<LandingPage onLogin={() => setShowLoginModal(true)} />} />
            {isAuthenticated ? (
              <>
                <Route path="/home" element={<HomePage />} />
                <Route path="/services" element={<ServicePage />} />
                <Route path="/buy" element={<BuyPage />} />
                <Route path="/sell" element={<SellPage />} />
                <Route path="/wish" element={<WishPage />} />
                <Route path='/faq' element={<FAQ />} />
              </>
            ):(
              <Route path="*" element={<Navigate to="/" />} />
            )}

          </Routes>
        </div>
        <Footer/>
      </div>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />}

    </>
  );
}

export default App
