const admin = require('../config/firebase-admin');
const userService = require('../services/user.service');

const verifyFirebaseToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const user = await userService.upsertUser({
            email: decodedToken.email,
            name: decodedToken.name,
            photoURL: decodedToken.picture
        });

        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};

const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }
        next();
    };
};

const verifyAdmin = verifyRole(['admin']);
const verifyOrganization = verifyRole(['admin', 'organization']);
const verifyResearcher = verifyRole(['admin', 'researcher']);

module.exports = {
    verifyFirebaseToken,
    verifyAdmin,
    verifyOrganization,
    verifyResearcher,
    verifyRole
};
