import { useState } from 'react';
import { Container, Modal, Button } from 'react-bootstrap'
import './RegisterUser.css'
import './Login.css'
import farmLogo from '../assets/images/farm_logo.png'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { create } from '../apis/user.api'

export default function RegisterUser() {

    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
    });

    const [open, setOpen] = useState(false);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
        };

        create(user).then((data) => {  
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                if(data.message)
                    setOpen(true);
            }
        });
    };

    RegisterUser.propTypes = {
        open: PropTypes.bool.isRequired,
        handleClose: PropTypes.func.isRequired,
    };

    return (<>
        <div className="farm-register">
            <Container className='farm-register-container'>
                <div className="farm-register-content">
                <div className="farm-register-logo">
                        <img className="farm-main-logo-img img-fluid"
                            src={farmLogo} />
                    </div>
                    <div className="farm-register-header">
                        <h3>Sign Up</h3>
                    </div>
                    <div className="farm-register-ctrl input-group flex-nowrap">
                        <span className='input-group-text'><i className="bi bi-person"></i></span>
                        <input type='text' placeholder='Username' value={values.name}
                            onChange={handleChange('name')} />
                    </div>
                    <div className="farm-register-ctrl input-group flex-nowrap">
                        <span className='input-group-text'><i className="bi bi-person"></i></span>
                        <input type='email' placeholder='Email' value={values.email}
                            onChange={handleChange('email')} />
                    </div>
                    <div className="farm-register-ctrl input-group flex-nowrap">
                        <span className='input-group-text'><i className="bi bi-lock"></i></span>
                        <input type='password' placeholder='Password' value={values.password}
                            onChange={handleChange('password')} />
                    </div>
                    <div className="farm-register-btn">
                        <button onClick={clickSubmit}>Sign Up</button>
                    </div>
                    <div className="farm-register-footer">
                        <div className="farm-register-signup">Already have an account? <span><Link to="/login"> Login</Link></span></div>
                    </div>
                </div>
            </Container>
        </div>

        {/* Registration Confirmation Modal */}
        <Modal show={open}>
            <Modal.Header>
                <Modal.Title>New Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                New account successfully created.
            </Modal.Body>
            <Modal.Footer>
                <Link to="/login">
                    <Button variant="danger" onClick={handleClose}>
                        Login
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    </>)
}