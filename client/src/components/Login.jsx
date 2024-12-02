import { Container } from 'react-bootstrap'
import './Login.css'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate();
    return (<>
        <div className="farm-login">
            <Container className='farm-login-container'>
                <div className="farm-login-content">
                    <div className="farm-login-header">
                        <h3>Farmer&apos;s Market</h3>
                    </div>
                    <div className="farm-login-ctrl input-group flex-nowrap">
                        <span className='input-group-text'><i className="bi bi-person"></i></span>
                        <input type='text' placeholder='Username' />
                    </div>
                    <div className="farm-login-ctrl input-group flex-nowrap">
                        <span className='input-group-text'><i className="bi bi-lock"></i></span>
                        <input type='password' placeholder='Password' />
                    </div>
                    <div className="farm-login-btn">
                        <button onClick={() => navigate("/farmerhome")}>Login</button>
                    </div>
                    <div className="farm-login-footer">
                        <div className="farm-login-signup">Don&apos;t have an account? <span>Sign Up</span></div>
                        <div className="farm-login-forget">Forget Password?</div>
                    </div>
                </div>
            </Container>
        </div>
    </>)
}