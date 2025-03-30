import { useState } from 'react';
import axios from 'axios';
import CryptoJs from 'crypto-js';
import './LoginModal.css';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;
const API_BASE_URL = 
    window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : `http://${window.location.hostname}:5000`;

const LoginModal = ({ onClose, onLogin }) => {
    const [staffno, setStaffno] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const encryptPassword = (password) => {
        return CryptoJs.AES.encrypt(password, ENCRYPTION_KEY).toString();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const encryptedPassword = encryptPassword(password);

        try{
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {staffno, password: encryptedPassword});
            const { token, name, staffno: storedStaffno } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('staffno', storedStaffno);
            localStorage.setItem('name', name);
            onLogin();
        }catch(error){
            setError(error.response?.data?.message || 'Login Failed, Please try again');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="login-modal">
                <h2>Login</h2>
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input 
                            type="text" 
                            placeholder="Staff Number" 
                            value={staffno} 
                            onChange={(e) => setStaffno(e.target.value)}
                            autoFocus
                            required 
                        />
                    </div>
                    <div className="input-container">
                        <input 
                            id='password'
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    {error && <p className="error">{error}</p>}
                    <button className='login-btn' type="submit">Login</button>
                </form>
                <button className="close-btn" onClick={onClose}>x</button>
            </div>
        </div>
    );
};

export default LoginModal;
