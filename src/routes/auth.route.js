const express = require('express');
const router = express.Router();
const logger = require('src/logger');
const authService = require('src/services/auth.service');

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    logger.info(`login ${email}`);

    authService.login(email, password)
    .then(({ accessToken, refreshAccessToken }) => { 
        // Creating refresh token not that expiry of refresh 
        //token is greater than the access token
        res.cookie('jwt', refreshAccessToken, {
            httpOnly: true,
            sameSite: 'None', 
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });          
        res.status(200).send({ accessToken });
    })
    .catch(({status, message}) => res.status(status ?? 500).send(message));  
});

router.post('/register', (req, res) => {
    logger.info(`registering user ${req.body.email}`);

    authService.register(req.body)
    .then((user) => res.status(200).send(user))
    .catch(({message}) => res.status(500).send(message));
});

router.post('/refresh', (req, res) => {
    logger.info(`refreshing token`);

    authService.refreshAccessToken(req)
    .then((token) => res.status(200).send(token))
    .catch(({message}) => res.status(500).send(message));
});


module.exports = router;
