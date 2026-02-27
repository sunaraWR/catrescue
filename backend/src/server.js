const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');
const userRoutes = require('./routes/userRoutes');
const highscoreRoutes = require('./routes/highscoreRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main Routes
app.use('/api/users', userRoutes);
app.use('/api/highscores', highscoreRoutes);

app.get('/', (req, res) => {
    res.send('Cat Rescue Maze API is running');
});

// Initialize Database Tables
const initDB = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                avatar VARCHAR(50) DEFAULT '🐈',
                missions_count INT DEFAULT 0,
                avg_time VARCHAR(20) DEFAULT '0:00'
            )
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS highscores (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                level INT NOT NULL,
                total_time INT NOT NULL,
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Database tables initialized');
    } catch (err) {
        console.error('Database initialization error:', err.message);
    }
};

initDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
