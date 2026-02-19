import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import VehicleListing from './pages/VehicleListing';
import VehicleDetails from './pages/VehicleDetails';
import LOSApplication from './pages/LOSApplication';
import MyQuotes from './pages/MyQuotes';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Payment from './pages/Payment';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<VehicleListing />} />
                <Route path="/vehicles" element={<VehicleListing />} />
                <Route path="/vehicles/:id" element={<VehicleDetails />} />
                <Route path="/my-quotes" element={<MyQuotes />} />
                <Route path="/application" element={<LOSApplication />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </Router>
    );
}

export default App;
