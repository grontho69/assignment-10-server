const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app');
const { connectDB } = require('./src/config/db');
require('dotenv').config();

const port = process.env.PORT || 3000;
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'https://eco-report-mmg.netlify.app', 'https://eco-report-client.vercel.app'],
        credentials: true
    },
    transports: ['websocket', 'polling']
});

// Make io accessible globally
global.io = io;

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const startServer = async () => {
    try {
        await connectDB();
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();
