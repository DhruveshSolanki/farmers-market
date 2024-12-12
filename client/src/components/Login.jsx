import { useState } from 'react'
import { Container } from 'react-bootstrap'
import './Login.css'
import farmLogo from '../assets/images/farm_logo.png'
import { signin } from '../apis/auth.api'
import auth from '../helpers/auth.helper'
import { Link, Navigate, useLocation } from 'react-router-dom'

export default function Login(props) {

    const location = useLocation();

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    })

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const validate = () => {
        let isValid = true;
        const newErrors = {};

        if (!values.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        if (!values.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (values.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const clickSubmit = () => {
        if (!validate()) {
            return;
        }

        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        }

        signin(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                auth.authenticate(data, () => {
                    setValues({ ...values, error: '', redirectToReferrer: true })
                })
            }
        })
    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const { from } = location.state || {
        from: {
            pathname: '/farmerhome'
        }
    }
    const { redirectToReferrer } = values
    if (redirectToReferrer) {
        return <Navigate to={from} />;
    }


    return (<>
        <div className="farm-login">
            <Container className='farm-login-container'>
                <div className="farm-login-content">
                    <div className="farm-login-logo">
                        <img className="farm-main-logo-img img-fluid"
                            src={farmLogo} />
                    </div>
                    <div className="farm-login-header">
                        <h3>Farmer&apos;s Market</h3>
                    </div>
                    <div className="farm-login-ctrl input-group flex-nowrap">
                        <span className='input-group-text'><i className="bi bi-person"></i></span>
                        <input type='email' placeholder='Email' value={values.email} onChange={handleChange('email')} />
                    </div>
                    {errors.email && <div className="error-message">{errors.email}</div>}
                    <div className="farm-login-ctrl input-group flex-nowrap">
                        <span className='input-group-text'><i className="bi bi-lock"></i></span>
                        <input type='password' placeholder='Password' value={values.password} onChange={handleChange('password')} />
                    </div>
                    {errors.password && <div className="error-message">{errors.password}</div>}
                    <div className="farm-login-btn">
                        <button onClick={clickSubmit} >Login</button>
                    </div>
                    <div className="farm-login-footer">
                        <div className="farm-login-signup">Don&apos;t have an account? <span><Link to="/signup"> Sign Up</Link></span></div>
                        <div className="farm-login-forget">Forget Password?</div>
                    </div>
                </div>
            </Container>
        </div>
    </>)
}