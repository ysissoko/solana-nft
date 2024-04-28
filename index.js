require('app-module-path').addPath(__dirname);
require('dotenv').config();

const config = require('src/services/config.service');
const logger = require('src/logger');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
// Requests rate limiter
const rateLimitMiddleware = require('src/middlewares/rate-limiter');

// 🔒 Security

const helmet = require('helmet');

// Middlewares
// Use Helmet middleware to set various HTTP headers for security
app.use(helmet());
app.use(express.static(config.uploads.dir))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimitMiddleware);

// End middlewares

app.use('/nft', require('src/routes/nft.route'));
app.use('/uploads', require('src/routes/upload.route'));
app.use('/auth', require('src/routes/auth.route'));

app.use('/brand', require('src/routes/crud/brand.route'));
app.use('/post', require('src/routes/crud/post.route'));
app.use('/comment', require('src/routes/crud/comment.route'));
app.use('/onboarding', require('src/routes/crud/on-boarding.route'));
app.use('/notification', require('src/routes/crud/notification.route'));

app.listen(config.app.port, async () => {
    logger.info(`Process is running on port ${config.app.port}. now starting mongoose connection...`)
    try {
        await mongoose.connect(config.mongodb.url);
        logger.info(`🔌 Connected successfully to ${config.mongodb.url}`)
        
    } catch (e) {
        logger.error(`❌ Error connecting to database @ ${config.mongodb.url}`)
    }
});
