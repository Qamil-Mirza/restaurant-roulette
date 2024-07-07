// Get credentials from .env file
const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});

const express = require('express');
const app = express();
const server_port = process.env.SERVER_PORT;

// Middleware
app.use(cors());
app.use(express.json());

app.listen(server_port, () => console.log(`Server running on port ${server_port}`));