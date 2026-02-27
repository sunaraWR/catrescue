const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const [existing] = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`;

        await db.query('INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, avatar]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length === 0) return res.status(400).json({ message: 'User not found' });

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, username: user.username, email: user.email, avatar: user.avatar, missions_count: user.missions_count, avg_time: user.avg_time } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Profile
router.get('/profile/:id', async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, username, email, avatar, missions_count, avg_time FROM users WHERE id = ?', [req.params.id]);
        if (users.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(users[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Profile
router.put('/profile/:id', async (req, res) => {
    const { username, email, avatar } = req.body;
    try {
        await db.query('UPDATE users SET username = ?, email = ?, avatar = ? WHERE id = ?', [username, email, avatar, req.params.id]);
        res.json({ message: 'Profile updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Change Password
router.put('/profile/:id/password', async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        const [users] = await db.query('SELECT password FROM users WHERE id = ?', [req.params.id]);
        if (users.length === 0) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(currentPassword, users[0].password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, req.params.id]);

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Stats (Missions and Avg Time)
router.put('/profile/:id/stats', async (req, res) => {
    const { timeTaken } = req.body; // in seconds
    try {
        const [users] = await db.query('SELECT missions_count, total_time_seconds FROM users WHERE id = ?', [req.params.id]);
        if (users.length === 0) return res.status(404).json({ message: 'User not found' });

        const userData = users[0];
        const newMissionsCount = (userData.missions_count || 0) + 1;
        const newTotalTimeSeconds = (userData.total_time_seconds || 0) + parseInt(timeTaken);
        const avgSeconds = Math.round(newTotalTimeSeconds / newMissionsCount);

        const minutes = Math.floor(avgSeconds / 60);
        const seconds = avgSeconds % 60;
        const newAvgTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        await db.query('UPDATE users SET missions_count = ?, total_time_seconds = ?, avg_time = ? WHERE id = ?',
            [newMissionsCount, newTotalTimeSeconds, newAvgTime, req.params.id]);

        res.json({
            missions_count: newMissionsCount,
            avg_time: newAvgTime,
            total_time_seconds: newTotalTimeSeconds
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
