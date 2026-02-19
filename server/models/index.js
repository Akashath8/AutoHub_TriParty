const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// --- User Model ---
const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }, // Store hash in production
    role: { type: DataTypes.STRING, defaultValue: 'user' },
    pan: DataTypes.STRING,
    aadhaar: DataTypes.STRING,
    panVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    aadhaarVerified: { type: DataTypes.BOOLEAN, defaultValue: false }
});

// --- Vehicle Model ---
const Vehicle = sequelize.define('Vehicle', {
    name: { type: DataTypes.STRING, allowNull: false },
    brand: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false }, // New/Old
    category: { type: DataTypes.STRING, allowNull: false }, // 2 Wheeler, 4 Wheeler
    price: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    specs: { type: DataTypes.JSON } // JSON for generic specs
});

// --- Cart Model ---
const Cart = sequelize.define('Cart', {
    status: { type: DataTypes.STRING, defaultValue: 'active' }
});

const CartItem = sequelize.define('CartItem', {
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
});

// --- Quotation Model ---
const Quotation = sequelize.define('Quotation', {
    quoteId: { type: DataTypes.STRING, unique: true },
    offerPrice: { type: DataTypes.FLOAT },
    status: { type: DataTypes.STRING, defaultValue: 'New' }, // New, Counter, Accepted
    receivedDate: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW }
});

// --- Order Model ---
const Order = sequelize.define('Order', {
    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
    paymentMode: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: 'pending' }, // pending, completed
    loanStatus: { type: DataTypes.STRING, defaultValue: 'Not Applied' } // Not Applied, In Progress, Approved
});

// --- Loan Application Model ---
const LoanApplication = sequelize.define('LoanApplication', {
    status: { type: DataTypes.STRING, defaultValue: 'Draft' }, // Draft, Submitted, Approved, Rejected
    step: { type: DataTypes.INTEGER, defaultValue: 1 },
    applicantDetails: { type: DataTypes.JSON },
    financialDetails: { type: DataTypes.JSON },
    loanConfig: { type: DataTypes.JSON }
});

// --- Document Model ---
const Document = sequelize.define('Document', {
    category: { type: DataTypes.STRING, allowNull: false }, // KYC, Address, Financial, etc.
    name: { type: DataTypes.STRING, allowNull: false },
    filePath: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'Pending' } // Pending, Verified
});

// --- Notification Model ---
const Notification = sequelize.define('Notification', {
    message: DataTypes.STRING,
    type: DataTypes.STRING,
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
    referenceId: DataTypes.STRING
});

// --- Associations ---
User.hasOne(Cart); Cart.belongsTo(User);
Cart.hasMany(CartItem); CartItem.belongsTo(Cart);
Vehicle.hasMany(CartItem); CartItem.belongsTo(Vehicle);

User.hasMany(Quotation); Quotation.belongsTo(User);
Vehicle.hasMany(Quotation); Quotation.belongsTo(Vehicle);

User.hasMany(Order); Order.belongsTo(User);
Order.hasOne(LoanApplication); LoanApplication.belongsTo(Order);
User.hasMany(LoanApplication); LoanApplication.belongsTo(User);

LoanApplication.hasMany(Document); Document.belongsTo(LoanApplication);

module.exports = {
    sequelize,
    User,
    Vehicle,
    Cart,
    CartItem,
    Quotation,
    Order,
    LoanApplication,
    Document,
    Notification
};
