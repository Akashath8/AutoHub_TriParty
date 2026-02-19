import { useState, useEffect } from 'react';
import { Container, Table, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navbar';

const Cart = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            axios.get(`http://localhost:5000/api/cart?userId=${user.id}`)
                .then(res => setItems(res.data))
                .catch(err => console.error(err));
        } else {
            // Optional: Handle guest cart via localStorage
        }
    }, []);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="bg-light min-vh-100">
            <Navigation />
            <Container className="py-5">
                <h2 className="mb-4">Shopping Cart</h2>
                {items.length === 0 ? (
                    <div className="text-center py-5">
                        <h4>Your cart is empty</h4>
                        <Link to="/vehicles" className="btn btn-primary mt-3">Browse Vehicles</Link>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-md-8">
                            <Card className="shadow-sm border-0 mb-4">
                                <Table responsive className="mb-0">
                                    <thead>
                                        <tr>
                                            <th className="ps-4">Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map(item => (
                                            <tr key={item.id} style={{ verticalAlign: 'middle' }}>
                                                <td className="ps-4">
                                                    <div className="d-flex align-items-center">
                                                        <img src={item.image} width="80" className="rounded me-3" />
                                                        <div>
                                                            <div className="fw-bold">{item.brand} {item.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>₹{item.price.toLocaleString()}</td>
                                                <td>{item.quantity}</td>
                                                <td className="fw-bold">₹{(item.price * item.quantity).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card>
                        </div>
                        <div className="col-md-4">
                            <Card className="shadow-sm border-0 p-4">
                                <h5 className="mb-3">Order Summary</h5>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3 text-success">
                                    <span>Discount</span>
                                    <span>- ₹0</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-4 fs-5 fw-bold">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                                <Button variant="primary" size="lg" className="w-100" onClick={() => navigate('/payment')}>
                                    Proceed to Checkout
                                </Button>
                            </Card>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Cart;
