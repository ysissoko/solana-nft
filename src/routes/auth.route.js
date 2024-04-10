const express = require('express');
const router = express.Router();
const logger = require('src/logger');
const authService = require('src/services/auth.service');

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    logger.info(`login ${email}`);

    authService.login(email, password)
    .then(res.status(200).send)
    .catch(({status, message}) => res.status(status ?? 500).send(message));  
});

router.post('/register', (req, res) => {
    logger.info(`registering user ${email}`);

    authService.register(req.body)
    .then(res.status(200).send)
    .catch(({message}) => res.status(500).send(message));
});

module.exports = router;
