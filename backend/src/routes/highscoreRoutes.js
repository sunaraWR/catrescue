const express = require('express');
const router = express.Router();
const db = require('../db');

// Get Top 10 Highscores (with optional difficulty filter)
router.get('/', async (req, res) => {
    const { difficulty } = req.query;
    try {
        let query = 'SELECT username, level, total_time, difficulty, date FROM highscores';
        const params = [];

        if (difficulty && difficulty !== 'all') {
            query += ' WHERE difficulty = ?';
            params.push(difficulty);
        }

        query += ' ORDER BY level DESC, total_time ASC LIMIT 10';

        const [scores] = await db.query(query, params);
        res.json(scores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Save Highscore
router.post('/', async (req, res) => {
    const { username, level, total_time, difficulty } = req.body;
    try {
        await db.query('INSERT INTO highscores (username, level, total_time, difficulty) VALUES (?, ?, ?, ?)', [username, level, total_time, difficulty || 'medium']);

        res.status(201).json({ message: 'Highscore saved successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
