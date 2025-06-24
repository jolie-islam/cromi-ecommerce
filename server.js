const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 8000;

// Enable JSON body parsing
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.json')) {
            res.set('Content-Type', 'application/json');
        }
    }
}));

// Specific route for products.json
app.get('/data/products.json', async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'public', 'data', 'products.json');
        console.log('Attempting to serve:', filePath);
        const data = await fs.readFile(filePath, 'utf8');
        res.set('Content-Type', 'application/json');
        res.send(data);
    } catch (error) {
        console.error('Error serving products.json:', error);
        res.status(500).json({ error: 'Failed to load products' });
    }
});

// Session storage (for demo purposes)
let isAuthenticated = false;

// Admin login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Hardcoded credentials for the demo
    if (username === 'admin' && password === 'admin123') {
        isAuthenticated = true;
        return res.status(200).json({ message: 'Login successful' });
    } else {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Admin logout endpoint
app.post('/api/logout', (req, res) => {
    isAuthenticated = false;
    res.status(200).json({ message: 'Logout successful' });
});

// Get orders endpoint
app.get('/api/orders', async (req, res) => {
    if (!isAuthenticated) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
        const ordersPath = path.join(__dirname, 'data', 'orders.json');
        const orders = JSON.parse(await fs.readFile(ordersPath, 'utf8'));
        res.json(orders);
    } catch (error) {
        console.error('Error reading orders:', error);
        res.status(500).json({ error: 'Failed to load orders' });
    }
});

// Order endpoint
app.post('/api/order', async (req, res) => {
    const orderData = req.body;
    try {
        // Append the new order to data/orders.json
        const ordersPath = path.join(__dirname, 'data', 'orders.json');
        const ordersJson = await fs.readFile(ordersPath, 'utf8');
        const orders = JSON.parse(ordersJson);
        orders.push(orderData);
        await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));
        return res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
        console.error('Error placing order:', error);
        return res.status(500).json({ error: 'Failed to place order' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Serving files from: ${path.join(__dirname, 'public')}`);
});
