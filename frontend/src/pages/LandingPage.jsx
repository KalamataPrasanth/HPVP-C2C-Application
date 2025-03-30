import './LandingPage.css';

const LandingPage = ({ onLogin }) => {
    return (
        <div className="landing-page">
            <div className="welcome-text">
                <p id='hero-text'>Welcome to HPVP vizag - Buy n Sell Portal</p>
                <p id='hero-caption'>Buy, sell and find just about anything within wour workplace right at your fingertips.</p>
                <button id='login-btn' onClick={onLogin}>Login to Explore.</button>
            </div>
        </div>
    );
};

export default LandingPage;