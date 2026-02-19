const express = require('express');
const router = express.Router();
const { User, Vehicle, Quotation, Notification } = require('../models');

// --- Auth Routes (Mocked for speed) ---
router.post('/auth/register', async (req, res) => {
    try {
        const { name, email, password, pan } = req.body;
        // Check if user exists
        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ error: 'User already exists' });

        // Create User
        user = await User.create({
            name,
            email,
            password, // In real app, hash this!
            pan,
            role: 'user'
        });

        res.json({ message: 'Registration successful', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/auth/login', async (req, res) => {
    // In real app, verify password
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) res.json({ token: 'mock-jwt-token', user });
    else res.status(401).json({ error: 'Invalid credentials' });
});

router.get('/auth/me', async (req, res) => {
    // In real app, verify token
    const user = await User.findOne(); // Return first user for demo
    res.json(user);
});

// --- Vehicle Routes ---
router.get('/vehicles', async (req, res) => {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
});

router.get('/vehicles/:id', async (req, res) => {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (vehicle) res.json(vehicle);
    else res.status(404).json({ error: 'Not Found' });
});

// --- Quotation Routes ---
router.get('/quotations', async (req, res) => {
    const quotes = await Quotation.findAll({
        include: [Vehicle],
        order: [['createdAt', 'DESC']]
    });

    // Transform for frontend
    const formatted = quotes.map(q => ({
        quoteId: q.quoteId,
        category: q.Vehicle?.category,
        type: q.Vehicle?.type,
        brand: q.Vehicle?.brand,
        productName: q.Vehicle?.name,
        price: q.Vehicle?.price,
        offerPrice: q.offerPrice,
        quantity: 1, // Mock
        status: q.status,
        receivedDate: q.receivedDate
    }));

    res.json(formatted);
});

router.post('/quotations', async (req, res) => {
    const { vehicleId, offerPrice, userId } = req.body;
    try {
        const vehicle = await Vehicle.findByPk(vehicleId);
        const count = await Quotation.count();
        const quoteId = `#${(count + 1).toString().padStart(4, '0')}`;

        const newQuote = await Quotation.create({
            quoteId,
            VehicleId: vehicleId,
            UserId: userId || 1, // Default user
            offerPrice: offerPrice || vehicle.price,
            receivedDate: new Date()
        });

        // Create Notification
        await Notification.create({
            message: `Quotation Request for ${vehicle.brand} > ${vehicle.name}`,
            type: 'quotation',
            referenceId: quoteId
        });

        res.json(newQuote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Notification Routes ---
router.get('/notifications', async (req, res) => {
    const notifs = await Notification.findAll({ order: [['createdAt', 'DESC']] });
    res.json(notifs);
});

// --- Cart Routes ---
router.get('/cart', async (req, res) => {
    const { userId } = req.query; // Simple auth for demo
    if (!userId) return res.status(400).json({ error: 'UserId required' });

    let cart = await Cart.findOne({ where: { UserId: userId, status: 'active' }, include: [CartItem] });
    if (!cart) return res.json({ items: [] });

    const items = [];
    for (const item of cart.CartItems) {
        const vehicle = await Vehicle.findByPk(item.VehicleId);
        if (vehicle) {
            items.push({
                id: vehicle.id,
                cartItemId: item.id,
                name: vehicle.name,
                brand: vehicle.brand,
                price: vehicle.price,
                image: vehicle.image,
                quantity: item.quantity
            });
        }
    }
    res.json(items);
});

router.post('/cart', async (req, res) => {
    const { userId, vehicleId } = req.body;
    try {
        let cart = await Cart.findOne({ where: { UserId: userId, status: 'active' } });
        if (!cart) cart = await Cart.create({ UserId: userId, status: 'active' });

        const [item, created] = await CartItem.findOrCreate({
            where: { CartId: cart.id, VehicleId: vehicleId },
            defaults: { quantity: 1 }
        });

        if (!created) {
            item.quantity += 1;
            await item.save();
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
