const setRateLimit = require("express-rate-limit");
const config = require('src/services/config.service');

const { windowMinutes, max, message } = config.rateLimiter;

// Rate limit middleware
const rateLimitMiddleware = setRateLimit({
  windowMs: windowMinutes * 60 * 1000,
  max,
  message,
  headers: true,
});

module.exports = rateLimitMiddleware;
