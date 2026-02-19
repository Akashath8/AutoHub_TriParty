import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button, Image, ListGroup, Modal, Form } from 'react-bootstrap';
import Navigation from '../components/Navbar';

const VehicleDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/vehicles/${id}`)
            .then(res => {
                setVehicle(res.data);
                setOfferPrice(res.data.price);
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email: loginEmail, password: loginPassword });
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setShowLoginModal(false);
            // Auto-proceed to cart adding
            handleBuyNow();
        } catch (err) {
            alert('Invalid Credentials');
        }
    };

    const handleBuyNow = () => {
        const user = localStorage.getItem('user');
        if (user) {
            axios.post('http://localhost:5000/api/cart', {
                userId: JSON.parse(user).id,
                vehicleId: vehicle.id
            }).then(() => navigate('/cart'));
        } else {
            setShowLoginModal(true);
        }
    };

    const handleRequestQuote = () => {
        axios.post('http://localhost:5000/api/quotations', {
            vehicleId: vehicle.id,
            offerPrice: offerPrice
        })
            .then(res => {
                setShowModal(false);
                navigate('/my-quotes');
            })
            .catch(err => alert('Error sending request'));
    };

    if (!vehicle) return <div>Loading...</div>;

    return (
        <>
            <Navigation />
            <Container className="py-5">
                <Button variant="link" onClick={() => navigate(-1)} className="mb-3 ps-0 text-decoration-none">&larr; Back to Listing</Button>
                <Row>
                    <Col md={7}>
                        <Image src={vehicle.image} fluid rounded className="shadow mb-4" />
                        <h4>Specifications</h4>
                        <ListGroup variant="flush">
                            <ListGroup.Item><strong>Fuel Type:</strong> {vehicle.specs?.fuel}</ListGroup.Item>
                            <ListGroup.Item><strong>Transmission:</strong> {vehicle.specs?.transmission}</ListGroup.Item>
                            <ListGroup.Item><strong>Category:</strong> {vehicle.category}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={5}>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <h6 className="text-muted">{vehicle.brand}</h6>
                            <h2 className="mb-3">{vehicle.name}</h2>
                            <h3 className="text-primary mb-4">₹{vehicle.price.toLocaleString('en-IN')}</h3>

                            <div className="d-grid gap-3">
                                <Button variant="primary" size="lg" onClick={handleBuyNow}>Buy Now</Button>
                                <Button variant="outline-dark" size="lg" onClick={() => {
                                    const user = localStorage.getItem('user');
                                    if (user) setShowModal(true);
                                    else setShowLoginModal(true);
                                }}>Request Quotation</Button>
                            </div>

                            <div className="mt-4 p-3 bg-light rounded text-muted small">
                                <i className="fas fa-info-circle me-1"></i>
                                Request a quotation to negotiate price or apply for a loan via our banking partners.
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Quote Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Request Quotation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Enter your offer price for <strong>{vehicle.brand} {vehicle.name}</strong>.</p>
                    <Form.Group className="mb-3">
                        <Form.Label>Your Offer (₹)</Form.Label>
                        <Form.Control
                            type="number"
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            Standard Price: ₹{vehicle.price.toLocaleString('en-IN')}
                        </Form.Text>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleRequestQuote}>Send Request</Button>
                </Modal.Footer>
            </Modal>

            {/* Login Modal */}
            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted mb-3">Please login to continue with your purchase or quotation request.</p>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="justify-content-between">
                    <Button variant="link" onClick={() => navigate('/register')}>New User? Register</Button>
                    <div>
                        <Button variant="secondary" className="me-2" onClick={() => setShowLoginModal(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleLogin}>Login</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default VehicleDetails;
