const express = require('express');
const router = express.Router();
const logger = require('src/logger');
const authService = require('src/services/auth.service');

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    logger.info(`login ${email}`);

    authService.login(email, password)
    .then((user) => res.status(200).send(user))
    .catch(({status, message}) => res.status(status ?? 500).send(message));  
});

router.post('/register', (req, res) => {
    logger.info(`registering user ${req.body.email}`);

    authService.register(req.body)
    .then((user) => res.status(200).send(user))
    .catch(({message}) => res.status(500).send(message));
});

module.exports = router;
