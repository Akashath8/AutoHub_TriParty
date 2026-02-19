import { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navbar';

const Payment = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handlePayment = (e) => {
        e.preventDefault();
        setLoading(true);

        // Mock API Call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                navigate('/my-quotes'); // Or Orders page
            }, 2000);
        }, 1500);
    };

    if (success) {
        return (
            <Container className="d-flex align-items-center justify-content-center min-vh-100">
                <div className="text-center">
                    <div className="mb-4 text-success" style={{ fontSize: '4rem' }}><i className="fas fa-check-circle"></i></div>
                    <h2>Payment Successful!</h2>
                    <p className="text-muted">Redirecting you to your orders...</p>
                </div>
            </Container>
        );
    }

    return (
        <div className="bg-light min-vh-100">
            <Navigation />
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="shadow-sm border-0 p-4">
                            <h4 className="mb-4">Secure Checkout</h4>
                            <Form onSubmit={handlePayment}>
                                <div className="mb-3">
                                    <Form.Label>Payment Method</Form.Label>
                                    <div className="d-flex gap-3">
                                        <Card className="p-3 border-primary bg-light" style={{ cursor: 'pointer', width: '100px', textAlign: 'center' }}>
                                            <i className="fas fa-credit-card fa-2x text-primary mb-2"></i>
                                            <div className="small fw-bold">Card</div>
                                        </Card>
                                        <Card className="p-3 border" style={{ cursor: 'pointer', width: '100px', textAlign: 'center' }}>
                                            <i className="fab fa-google-pay fa-2x text-muted mb-2"></i>
                                            <div className="small fw-bold">UPI</div>
                                        </Card>
                                        <Card className="p-3 border" style={{ cursor: 'pointer', width: '100px', textAlign: 'center' }}>
                                            <i className="fas fa-university fa-2x text-muted mb-2"></i>
                                            <div className="small fw-bold">NetBank</div>
                                        </Card>
                                    </div>
                                </div>

                                <Form.Group className="mb-3">
                                    <Form.Label>Card Number</Form.Label>
                                    <Form.Control placeholder="xxxx xxxx xxxx xxxx" required />
                                </Form.Group>

                                <Row className="mb-4">
                                    <Col>
                                        <Form.Label>Expiry</Form.Label>
                                        <Form.Control placeholder="MM/YY" required />
                                    </Col>
                                    <Col>
                                        <Form.Label>CVV</Form.Label>
                                        <Form.Control type="password" placeholder="123" required />
                                    </Col>
                                </Row>

                                <div className="d-flex justify-content-between mb-4">
                                    <span className="fw-bold">Total Amount</span>
                                    <span className="fw-bold text-primary">₹8,50,650</span>
                                </div>

                                <Button variant="success" size="lg" className="w-100" type="submit" disabled={loading}>
                                    {loading ? 'Processing...' : 'Pay Now'}
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Payment;
