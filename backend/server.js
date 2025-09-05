const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Load .env file from backend directory
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.CORS_ORIGINS?.split(',') || ['https://yourdomain.com']
        : ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
};
app.use(cors(corsOptions));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/jharkhand_municipal_portal';
        await mongoose.connect(mongoUri);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        
        // In production, exit the process
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
        
        // In development, try local fallback
        try {
            await mongoose.connect('mongodb://localhost:27017/jharkhand_municipal_portal');
            console.log('✅ Connected to MongoDB (Local fallback)');
        } catch (localError) {
            console.error('❌ Local MongoDB connection also failed:', localError.message);
            process.exit(1);
        }
    }
};

// Connect to MongoDB
connectDB();

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public')));
    
    // Handle React routing, return all requests to React app
    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api/')) {
            return next();
        }
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}

// Routes
const issuesRouter = require('./routes/issues');
app.use('/api', issuesRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Jharkhand Municipal Portal API is running',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server with port conflict handling
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`❌ Port ${PORT} is already in use`);
        console.log(`🔄 Trying port ${PORT + 1}...`);
        
        app.listen(PORT + 1, () => {
            console.log(`🚀 Server running on http://localhost:${PORT + 1}`);
            console.log(`📊 API Health: http://localhost:${PORT + 1}/api/health`);
        });
    } else {
        console.error('❌ Server error:', err);
    }
});
