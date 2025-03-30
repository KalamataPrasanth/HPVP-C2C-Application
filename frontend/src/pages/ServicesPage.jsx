import { useNavigate} from 'react-router-dom';
import buyImg from '../assets/buy.png';
import sellImg from '../assets/sell.png';
import wishImg from '../assets/wish.png';
import './ServicePage.css'

const ServicePage = () => {
    const navigate = useNavigate();
    return(
        <div className="services">
            <h1 className='services-heading'>What would you like to do?</h1>
            <div className="services-container">
                <div className="service-card" onClick={() => navigate('/buy')}>
                    <img src={buyImg} alt='Buy Items'/>
                    <h2>BUY</h2>
                    <p>Find and buy items you need.</p>
                </div>
                <div className="service-card" onClick={() => navigate('/sell')}>
                    <img src={sellImg} alt='Sell Items'/>
                    <h2>SELL</h2>
                    <p>Post your items for sale.</p>
                </div>
                <div className="service-card" onClick={() => navigate('/wish')}>
                    <img src={wishImg} alt='Wish Items'/>
                    <h2>WISH</h2>
                    <p>Post a wish request.</p>
                </div>
            </div>
        </div>
    )
}

export default ServicePage;