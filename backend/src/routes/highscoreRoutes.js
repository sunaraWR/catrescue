const express = require('express');
const router = express.Router();
const db = require('../db');

// Get Top 10 Highscores
router.get('/', async (req, res) => {
    try {
        const [scores] = await db.query('SELECT username, level, total_time, date FROM highscores ORDER BY level DESC, total_time ASC LIMIT 10');
        res.json(scores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Save Highscore
router.post('/', async (req, res) => {
    const { username, level, total_time } = req.body;
    try {
        await db.query('INSERT INTO highscores (username, level, total_time) VALUES (?, ?, ?)', [username, level, total_time]);

        // Also update user's missions_count and avg_time
        const [users] = await db.query('SELECT missions_count, avg_time FROM users WHERE username = ?', [username]);
        if (users.length > 0) {
            const newCount = users[0].missions_count + 1;
            // Simplified avg_time update: just store the latest for now or calculate properly later
            // For now, let's just increment missions count
            await db.query('UPDATE users SET missions_count = ? WHERE username = ?', [newCount, username]);
        }

        res.status(201).json({ message: 'Highscore saved successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
