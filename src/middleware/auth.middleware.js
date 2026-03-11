const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const token = req.cookies?.token;
    
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized access: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized access: Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

const verifyRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!roles.includes(userRole)) {
            return res.status(403).send({ message: 'Forbidden access: Insufficient permissions' });
        }
        next();
    };
};

const verifyAdmin = verifyRole(['Admin']);
const verifyOrganization = verifyRole(['Admin', 'Organization']);
const verifyResearcher = verifyRole(['Admin', 'Researcher']);

module.exports = { 
    verifyJWT, 
    verifyAdmin, 
    verifyOrganization, 
    verifyResearcher,
    verifyRole 
};
