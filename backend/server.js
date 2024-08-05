const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '.env')
});

const express = require('express');
const cors = require('cors');
const oneUtamaRestaurantData = require('./scraper/restaurant_data.json');

const app = express();
const server_port = process.env.SERVER_PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/one-utama/restaurants', (req, res) => {
    try {
        res.json(oneUtamaRestaurantData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Listen (only if not in Vercel serverless environment)
if (!process.env.VERCEL) {
    app.listen(server_port, () => console.log(`Server running on port ${server_port}`));
}

module.exports = app;
