import {useNavigate} from 'react-router-dom';

import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('name');
    return(
        <div className="homepage">
            <div className="welcome-text">
                <p id='logged-in-user'>Welcome <span id='username'>{loggedInUser},</span></p>
                <p id='hero-text'>Seamless trade, right within your workplace.</p>
                <p id='hero-caption'>Post what you need, find what you want—hassle-free.</p>
                <button id='shop-now' onClick={() => navigate('/services')}>Dont Miss a deal, Shop now</button>
            </div>
        </div>
    );
}

export default HomePage