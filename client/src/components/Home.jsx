import { Container, Row, Col } from 'react-bootstrap'
import './Home.css'

export default function Home() {
    return (<>
        <div className="farm-home">
            <div className="farm-home-overlay">
                <Container className='farm-home-container'>
                    <Row className="justify-content-center">
                            <Col xs={12} md={10} xl={8}>
                                <div className="farm-name">FARM</div>
                                <h2 className="farm-title text-white">THE FARMER&apos;S MARKET</h2>
                                <p className="text-center">Connect with local farmers directly, 
                                    offering a simple, secure platform for managing and selling fresh produce online. 
                                    Enjoy easy access to quality products while supporting small farmers.</p>
                                <p className="mt-5 mt-md-10 text-center">
                                    <span className="d-none d-sm-block">
                                        <a className="farm-btn farm-btn-big" href="/about">Discover</a>
                                    </span>
                                </p>
                            </Col>
                    </Row>
                </Container>
            </div>
        </div>

    </>)
}