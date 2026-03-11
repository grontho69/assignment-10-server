const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const issueRoutes = require('./routes/issue.routes');
const contributionRoutes = require('./routes/contribution.routes');
const exportRoutes = require('./routes/export.routes');

const app = express();

// Security Middleware
app.use(helmet()); // Sets various HTTP headers for security

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'https://eco-report-mmg.netlify.app', 'https://eco-report-client.vercel.app'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/issues', issueRoutes);
app.use('/contributions', contributionRoutes);
app.use('/export', exportRoutes);

app.get('/', (req, res) => {
  res.send('EcoReport API is running...');
});

module.exports = app;
