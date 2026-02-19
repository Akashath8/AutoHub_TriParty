import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Badge, Button, Form, InputGroup } from 'react-bootstrap';
import { FaFilter, FaSearch, FaCommentDots } from 'react-icons/fa';
import Navigation from '../components/Navbar';

const MyQuotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [filter, setFilter] = useState('New'); // New, Counter, Accepted, Rejected

    useEffect(() => {
        // Fetch quotas
        axios.get('http://localhost:5000/api/quotations')
            .then(res => setQuotes(res.data))
            .catch(err => {
                console.log('Using mock data');
                setQuotes([
                    { quoteId: '#0001', category: '4 Wheelers', type: 'New', brand: 'Hyundai', productName: 'i10 Neo', price: 850650, offerPrice: 750000, quantity: 1, receivedDate: '21/3/2023', status: 'New' },
                    { quoteId: '#0002', category: '3 Wheelers', type: 'Old', brand: 'Tata Motors', productName: 'Tata Ace Gold', price: 350650, offerPrice: 300000, quantity: 1, receivedDate: '21/3/2023', status: 'Counter' },
                    { quoteId: '#0003', category: '4 Wheelers', type: 'New', brand: 'Maruti Suzuki', productName: 'Swift', price: 1050650, offerPrice: 950000, quantity: 1, receivedDate: '21/3/2023', status: 'New' },
                    { quoteId: '#0004', category: '3 Wheelers', type: 'New', brand: 'Tata Motors', productName: 'Tata Ace Mini', price: 250650, offerPrice: 230000, quantity: 1, receivedDate: '21/3/2023', status: 'Counter' },
                    { quoteId: '#0005', category: '2 Wheelers', type: 'Old', brand: 'Hero', productName: 'Dream Yuga', price: 85650, offerPrice: 80000, quantity: 2, receivedDate: '21/3/2023', status: 'Accepted' },
                ]);
            });
    }, []);

    const getStatusDot = (status) => {
        switch (status) {
            case 'New': return 'bg-success';
            case 'Counter': return 'bg-warning';
            case 'Accepted': return 'bg-primary';
            default: return 'bg-secondary';
        }
    }

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Navigation />

            <Container className="py-4">
                {/* Filters */}
                <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded shadow-sm">
                    <div className="d-flex gap-4">
                        {['New', 'Counter', 'Accepted', 'Rejected'].map(status => (
                            <div
                                key={status}
                                className={`fw-bold px-2 py-1 ${filter === status ? 'text-primary border-bottom border-primary border-2' : 'text-muted'}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setFilter(status)}
                            >
                                {status}
                            </div>
                        ))}
                    </div>
                    <div className="d-flex gap-2">
                        <InputGroup style={{ width: '250px' }}>
                            <InputGroup.Text className="bg-white border-end-0"><FaSearch className="text-muted" /></InputGroup.Text>
                            <Form.Control className="border-start-0" placeholder="Search" />
                        </InputGroup>
                        <Button variant="outline-secondary"><FaFilter className="me-2" /> Filter</Button>
                    </div>
                </div>

                {/* Table */}
                <div className="card border-0 shadow-sm">
                    <Table hover responsive className="mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 py-3 text-muted" style={{ fontSize: '0.85rem' }}>Quotation ID</th>
                                <th className="py-3 text-muted" style={{ fontSize: '0.85rem' }}>Category</th>
                                <th className="py-3 text-muted" style={{ fontSize: '0.85rem' }}>Type</th>
                                <th className="py-3 text-muted" style={{ fontSize: '0.85rem' }}>Brand</th>
                                <th className="py-3 text-muted" style={{ fontSize: '0.85rem' }}>Product Name</th>
                                <th className="py-3 text-muted" style={{ fontSize: '0.85rem' }}>Price</th>
                                <th className="py-3 text-muted" style={{ fontSize: '0.85rem' }}>Offer Price</th>
                                <th className="py-3 text-muted" style={{ fontSize: '0.85rem' }}>Quantity</th>
                                <th className="py-3 text-muted" style={{ fontSize: '0.85rem' }}>Received Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.map((q, i) => (
                                <tr key={i} style={{ verticalAlign: 'middle' }}>
                                    <td className="ps-4 fw-bold text-primary">
                                        <span className={`d-inline-block rounded-circle me-2 ${getStatusDot(q.status)}`} style={{ width: '8px', height: '8px' }}></span>
                                        <a href="#" className="text-decoration-none">{q.quoteId}</a>
                                    </td>
                                    <td>{q.category}</td>
                                    <td className="fw-bold">{q.type}</td>
                                    <td>{q.brand}</td>
                                    <td className="fw-bold">{q.productName}</td>
                                    <td className="text-decoration-line-through text-muted small">₹{q.price.toLocaleString('en-IN')}/-</td>
                                    <td className="fw-bold">₹{q.offerPrice.toLocaleString('en-IN')}/-</td>
                                    <td className="fw-bold text-center">{q.quantity}</td>
                                    <td>{q.receivedDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                {/* Chat Button (Floating) */}
                <div className="position-fixed bottom-0 end-0 m-4">
                    <Button variant="danger" className="rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: '60px', height: '60px' }}>
                        <FaCommentDots size={24} />
                    </Button>
                </div>

            </Container>
        </div>
    );
};

export default MyQuotes;
