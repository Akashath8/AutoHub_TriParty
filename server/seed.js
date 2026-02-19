const { sequelize, User, Vehicle, Quotation, Notification } = require('./models');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced.');

        // Seed Users
        const user = await User.create({
            name: 'Avinash S.',
            email: 'avinash@example.com',
            password: 'password123', // In real app, hash this
            pan: 'ABCDE1234F',
            aadhaar: '123412341234',
            panVerified: true,
            aadhaarVerified: true
        });

        // Seed Vehicles
        const vehicles = await Vehicle.bulkCreate([
            { name: 'i10 Neo', brand: 'Hyundai', type: 'New', category: '4 Wheelers', price: 850650, image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/35463/grand-i10-nios-exterior-right-front-three-quarter-2.jpeg', specs: { fuel: 'Petrol', transmission: 'Manual' } },
            { name: 'Swift', brand: 'Maruti Suzuki', type: 'New', category: '4 Wheelers', price: 1050650, image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/41197/new-swift-exterior-right-front-three-quarter.jpeg', specs: { fuel: 'Petrol', transmission: 'AMT' } },
            { name: 'Nexon', brand: 'Tata Motors', type: 'New', category: '4 Wheelers', price: 1250000, image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/41197/new-swift-exterior-right-front-three-quarter.jpeg', specs: { fuel: 'Diesel', transmission: 'Manual' } },
            { name: 'Ace Gold', brand: 'Tata Motors', type: 'Old', category: '3 Wheelers', price: 350650, image: 'https://5.imimg.com/data5/SELLER/Default/2021/6/NP/ZO/XB/3688176/tata-ace-gold-mini-truck.jpg', specs: { fuel: 'Diesel', transmission: 'Manual' } },
        ]);

        // Seed Quotations
        await Quotation.bulkCreate([
            { quoteId: '#0001', UserId: user.id, VehicleId: vehicles[0].id, offerPrice: 750000, status: 'New', receivedDate: '2023-03-21' },
            { quoteId: '#0002', UserId: user.id, VehicleId: vehicles[3].id, offerPrice: 300000, status: 'Counter', receivedDate: '2023-03-21' },
            { quoteId: '#0003', UserId: user.id, VehicleId: vehicles[1].id, offerPrice: 950000, status: 'New', receivedDate: '2023-03-21' }
        ]);

        // Seed Notifications
        await Notification.bulkCreate([
            { message: 'Quotation Request for Hyundai > i10 Neo', type: 'quotation', isRead: false, referenceId: '#0001' },
            { message: 'Quotation Request for Tata Motors > Ace Gold', type: 'quotation', isRead: false, referenceId: '#0002' }
        ]);

        console.log('Seeding complete.');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seedDatabase();
