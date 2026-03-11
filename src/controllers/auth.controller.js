const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
    try {
        const user = req.body;
        // In a real app, you'd verify user credentials here
        // For now, we assume the client provides the user info and role after Firebase auth
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 3600000 // 1 hour
        }).send({ success: true });

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
