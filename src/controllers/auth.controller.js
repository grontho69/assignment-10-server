const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
require('dotenv').config();

const login = async (req, res) => {
    try {
        const userData = req.body;
        const user = await userService.upsertUser(userData);
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 3600000
        }).send({ success: true, user });

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 0
        }).send({ success: true });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

module.exports = { login, logout };
