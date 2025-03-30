import {useNavigate} from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    return(
        <div className="homepage">
            <div className="welcome-text">
                <p id='hero-text'>Seamless trade, right within your workplace.</p>
                <p id='hero-caption'>Post what you need, find what you want—hassle-free.</p>
                <button id='shop-now' onClick={() => navigate('/services')}>Dont Miss a deal, Shop now</button>
            </div>
        </div>
    );
}

export default HomePage