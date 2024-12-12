import Container from "react-bootstrap/esm/Container";
import man_img from "../assets/images/farm_logo.png"
import { Link } from 'react-router-dom';
import "./About.css"
/*
=========================================================
* Student Name: Dhruvesh Solanki (301452856)
* Student ID: 301452856
* This Page Describes About Me  
=========================================================
*/

export default function About() {

    return (<>
        <div className="farm-home">
            <div className="farm-home-overlay">
                <section className="farm-about section" id="about">
                    <Container className="text-center pt-5">
                        <div className="about">
                            <div className="about-img-holder">
                                <img src={man_img} className="about-img"
                                    alt="Download free bootstrap 4 landing page, free boootstrap 4 templates, Download free bootstrap 4.1 landing page, free boootstrap 4.1.1 templates, meyawo Landing page" />
                            </div>
                            <div className="about-caption">
                                {/* <p className="section-subtitle">Who Am I ?</p> */}
                                <h2 className="section-title mt-3 mb-3">About Us</h2>
                                <p>
                                    Farmer’s Market is an online platform designed to help farmers sell their products directly to customers,
                                    expanding their reach beyond local markets. Our mission is to empower farmers by reducing intermediaries,
                                    ensuring fair profits, and promoting transparency through direct interactions.
                                    The platform simplifies inventory management with an easy-to-use dashboard and ensures secure access for users.
                                    Together, we aim to support local farmers and build stronger connections within communities.
                                    <br />
                                    <br />
                                    {/* <q className="section-subtitle">Self-motivated and well-disciplined when it comes to work</q> */}
                                </p>
                                <Link className="btn-rounded btn btn-outline-primary mt-4" to="/">Explore</Link>
                            </div>
                        </div>
                    </Container>
                </section>
            </div>
        </div>
    </>)
}