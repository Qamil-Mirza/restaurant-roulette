// Get credentials from .env file
const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});

const express = require('express');
const cors = require('cors');
const oneUtamaRestaurantData = require('./scraper/restaurant_data.json');

const app = express();
const server_port = process.env.SERVER_PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/one-utama/restaurants', async (req, res) => {
    try {
        res.json(oneUtamaRestaurantData);
    } catch (error) {
        console.error(error);
    }
})

app.listen(server_port, () => console.log(`Server running on port ${server_port}`));