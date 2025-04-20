const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Registro
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: 'Usuario registrado exitosamente' });
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    const user = await User.findOne({ username });
    if (user && user.password === password) {
        res.json({ message: 'Login exitoso' });
    } else {
        res.status(401).json({ message: 'Error de autenticación' });
    }
});

module.exports = router;
