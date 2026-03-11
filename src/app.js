const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const issueRoutes = require('./routes/issue.routes');
const contributionRoutes = require('./routes/contribution.routes');
const exportRoutes = require('./routes/export.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

const allowedOrigins = [
    'http://localhost:5173',
    'https://eco-report-mmg.netlify.app',
    'https://eco-report-mmg.netlify.app/',
    'https://eco-report-client.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes(origin + '/')) {
            callback(null, true);
        } else {
            callback(new Error('CORS Not Allowed'), false);
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/issues', issueRoutes);
app.use('/contributions', contributionRoutes);
app.use('/export', exportRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('EcoReport API is running...');
});

module.exports = app;
