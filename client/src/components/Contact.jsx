import { Container } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

/*
=========================================================
* Student Name: Dhruvesh Solanki (301452856)
* Student ID: 301452856
* This Page Contains Contact Form  
=========================================================
*/
export default function Contact() {

  const form = useRef();
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_orac61e', 'template_wo70lva', form.current, {
        publicKey: 'Futcr4O4xDDyhEslL',
      })
      .then(
        () => {
          setAlertMessage('Email sent successfully!');
          setAlertType('success');

          setTimeout(() => {
            setAlertMessage(null);
            navigate('/');
          }, 2000);

        },
        (error) => {
          console.log('FAILED...', error.text);
          setAlertMessage('Failed to send the email. Please try again.');
          setAlertType('danger');

          setTimeout(() => {
            setAlertMessage(null);
          }, 2500);
        },
      );
  };

  return (
    <>
      {alertMessage && (
        <div className={`contact-alert alert alert-${alertType} alert-dismissible fade show mt-3`} role="alert">
          {alertMessage}
        </div>
      )}
      <div className="farm-home">
        <div className="farm-home-overlay">
          <section className="farm-contact section" id="contact">
            <Container className="text-center pt-5">
              {/* <p className="section-subtitle">How can you communicate?</p> */}
              <h6 className="section-title mb-5">Contact Me</h6>
              <form ref={form} onSubmit={sendEmail} className="contact-form col-md-10 col-lg-8 m-auto">
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <input
                      type="text"
                      size="50"
                      className="form-control"
                      placeholder="Enter Name"
                      name='user_name'
                      required
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      name='user_email'
                      required
                    />
                  </div>
                  <div className="form-group col-sm-12">
                    <textarea
                      name="message"
                      id="comment"
                      rows="6"
                      className="form-control"
                      placeholder="Write Something"
                    ></textarea>
                  </div>
                  <div className="form-group col-sm-12 mt-3">
                    <input
                      type="submit"
                      value="Send Message"
                      className="btn btn-outline-primary rounded"
                    />
                  </div>
                </div>
              </form>
            </Container>
          </section>
        </div></div>
    </>
  );
}
