import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navbar';

const VehicleListing = () => {
    const [vehicles, setVehicles] = useState([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        axios.get('http://localhost:5000/api/vehicles')
            .then(res => setVehicles(res.data))
            .catch(err => console.error(err));
    }, []);

    const filteredVehicles = filter === 'All'
        ? vehicles
        : vehicles.filter(v => v.category === filter);

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Navigation />
            <Container className="py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Our Vehicles</h2>
                    <Form.Select style={{ width: '200px' }} onChange={(e) => setFilter(e.target.value)}>
                        <option value="All">All Categories</option>
                        <option value="4 Wheelers">4 Wheelers</option>
                        <option value="3 Wheelers">3 Wheelers</option>
                        <option value="2 Wheelers">2 Wheelers</option>
                    </Form.Select>
                </div>

                <Row xs={1} md={2} lg={3} className="g-4">
                    {filteredVehicles.map(vehicle => (
                        <Col key={vehicle.id}>
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Img variant="top" src={vehicle.image} style={{ height: '200px', objectFit: 'cover' }} />
                                <Card.Body>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="badge bg-light text-dark">{vehicle.category}</span>
                                        <span className="badge bg-success">{vehicle.type}</span>
                                    </div>
                                    <Card.Title>{vehicle.brand} {vehicle.name}</Card.Title>
                                    <Card.Text className="text-muted small">
                                        Fuel: {vehicle.specs?.fuel} | Trans: {vehicle.specs?.transmission}
                                    </Card.Text>
                                    <h5 className="text-primary mb-3">₹{vehicle.price.toLocaleString('en-IN')}</h5>
                                    <div className="d-grid gap-2">
                                        <Link to={`/vehicles/${vehicle.id}`} className="btn btn-outline-primary">View Details</Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default VehicleListing;
