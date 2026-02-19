import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart, FaUserCircle, FaBell, FaSignOutAlt } from 'react-icons/fa';
import { Badge, Dropdown, Navbar, Container, Nav, Button } from 'react-bootstrap';

const Navigation = () => {
    const [notifications, setNotifications] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));

        // Fetch notifications
        axios.get('http://localhost:5000/api/notifications')
            .then(res => setNotifications(res.data))
            .catch(err => console.log('Mocking notifications...'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold">
                    <img src="https://ui-avatars.com/api/?name=Trexo+Pro&background=random" width="30" height="30" className="d-inline-block align-top me-2 rounded" alt="Logo" />
                    Trexo <span className="text-info">Pro</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/vehicles" className="me-3">Category</Nav.Link>

                        {/* Search Bar */}
                        <div className="me-4 position-relative d-none d-lg-block">
                            <input type="text" className="form-control bg-dark text-light border-secondary" placeholder="Search" style={{ width: '250px', borderRadius: '20px' }} />
                        </div>

                        {user ? (
                            <>
                                {/* Notifications */}
                                <Dropdown align="end" className="me-3">
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic" className="position-relative">
                                        <FaBell size={20} />
                                        {unreadCount > 0 &&
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {unreadCount}
                                            </span>
                                        }
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{ width: '320px', padding: '0' }}>
                                        <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                                            <h6 className="mb-0 fw-bold">Notifications</h6>
                                        </div>
                                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {notifications.map((n, i) => (
                                                <Dropdown.Item key={i} className="p-3 border-bottom" style={{ whiteSpace: 'normal' }}>
                                                    <div className="d-flex gap-2">
                                                        <div className="mt-1" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#dc3545' }}></div>
                                                        <div>
                                                            <div className="small fw-bold">{n.message}</div>
                                                        </div>
                                                    </div>
                                                </Dropdown.Item>
                                            ))}
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>

                                {/* Cart */}
                                <Nav.Link as={Link} to="/cart" className="me-3 position-relative">
                                    <FaShoppingCart size={20} />
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style={{ fontSize: '0.6rem' }}>1</span>
                                </Nav.Link>

                                {/* User Profile */}
                                <Dropdown align="end">
                                    <Dropdown.Toggle variant="dark" id="dropdown-profile">
                                        <FaUserCircle size={20} className="me-2" /> {user.name}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/my-quotes">My Quotes</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/application">Loan Application</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={handleLogout} className="text-danger"><FaSignOutAlt className="me-2" />Log out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        ) : (
                            <div className="d-flex gap-2">
                                <Button as={Link} to="/login" variant="outline-light" size="sm">Login</Button>
                                <Button as={Link} to="/register" variant="primary" size="sm">Register</Button>
                            </div>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
