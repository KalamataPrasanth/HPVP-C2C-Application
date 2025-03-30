import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css'

const Navbar = ({ showLogin, onLogin, onLogout }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return(
        <nav className="navbar">
            <h2 className="logo">HPVP Vizag</h2>
            <div className="menu-icon" onClick={toggleMenu}>☰</div>
            <ul className={`navlist ${menuOpen ? 'open': ''}`}>
                { !showLogin && (
                    <>
                        <li className="nav-list-item"><Link to='/home' onClick={toggleMenu}>Home</Link></li>
                        <li className="nav-list-item"><Link to='/services' onClick={toggleMenu}>Shop</Link></li>
                        <li className="nav-list-item"><Link to='/faq' onClick={toggleMenu}>FAQs</Link></li>
                    </>
                    )}
                <li className="nav-list-item">
                    {showLogin ? (
                        <button onClick={onLogin} className='login-btn'>Login</button>
                    ) : (
                        <button onClick={onLogout} className='logout-btn'>Logout</button>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar