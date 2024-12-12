import './Header.css'
import Container from 'react-bootstrap/Container';
import farmLogo from '../assets/images/farm_logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import auth from '../helpers/auth.helper.js'


export default function Header() {

    const location = useLocation();
    const navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);

    const [isLoggedin, setIsLoggedin] = useState(auth.isAuthenticated());

    // Function to handle nav-bar toggle event
    const handleToggle = () => {
        setIsActive(!isActive); // Toggle the state
    };

    //handle logout
    const handleLogout = () => {
        auth.clearJWT()
        setIsLoggedin(false)
    }

    // Handle Products navigation
    const handleProductsClick = (e) => {
        e.preventDefault(); // Prevent default link navigation
        if (auth.isAuthenticated()) {
            setIsLoggedin(true);
            navigate('/farmerhome'); // Redirect to the products page
        } else {
            setIsLoggedin(false);
            navigate('/login'); // Redirect to the login page
        }
    };

    return (<>
        <header className="farm-header">
            <nav className={`farm-header-nav affix`} >
                <Container className="farm-header-nav-container">
                    <div className="farm-logo-container">
                        <Link className='farm-main-logo site-logo' to="/">
                            <img className="farm-main-logo-img img-fluid"
                                src={farmLogo} />
                        </Link>
                    </div>
                    <ul className={`nav ${isActive ? 'show' : ''}`}>
                        <li className="item">
                            <Link className="link" to="/"> Home</Link>
                        </li>
                        <li className="item">
                            <Link className="link" to="/login"> Offers</Link>
                        </li>
                        <li className="item">
                            <Link className="link" onClick={handleProductsClick}> Products</Link>
                        </li>
                        <li className="item">
                            <Link className="link" to="/about"> About</Link>
                        </li>
                        <li className="item">
                            <Link className="link" to="/contact"> Contact</Link>
                        </li>
                        <li className="item ml-md-3">
                            {
                                isLoggedin ? (<>
                                    <Link className="farm-btn farm-btn-small" to={'/'} onClick={handleLogout}> Logout</Link>
                                </>) : (<>
                                    <Link className="farm-btn farm-btn-small" to='/login'> Login</Link>
                                </>)
                            }
                        </li>
                    </ul>
                    <a href="javascript:void(0)" id="nav-toggle" onClick={handleToggle} className={`hamburger hamburger--elastic ${isActive ? 'is-active' : ''}`}>
                        <div className="hamburger-box">
                            <div className="hamburger-inner"></div>
                        </div>
                    </a>
                </Container>
            </nav>
        </header>
    </>)
}