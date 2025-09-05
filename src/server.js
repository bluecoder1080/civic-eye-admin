const path = require('path');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// DB
const mongoUri = process.env.MONGO_URI;
mongoose
    .connect(mongoUri, { dbName: undefined })
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });

// Routes
const issuesRouter = require('./routes/issues');
app.use('/', issuesRouter);

// Start
const port = process.env.PORT || 5000;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${port}`);
});


