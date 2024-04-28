const authService = require('src/services/auth.service');
const logger = require('src/logger');

/**
 * Function to handle user login.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to the access token.
 * @throws {Error} - If there is an error during login.
 */
async function login(req, res) {
    const { email, password } = req.body;

    logger.info(`login ${email}`);

    const { accessToken, refreshAccessToken } = await authService.login(email, password)
    // Creating refresh token not that expiry of refresh 
    //token is greater than the access token
    res.cookie('jwt', refreshAccessToken, {
        httpOnly: true,
        sameSite: 'None', 
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });          

    res.status(200).send({ accessToken });
}

/**
 * Registers a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise} A promise that resolves with the registered user.
 * @throws {Error} If there is an error during registration.
 */
async function register(req, res) {
    logger.info(`registering user ${req.body.email}`);

    const user = await authService.register(req.body)
    res.status(200).send(user)
}
/**
 * Refreshes the access token.
 *
 * This function is responsible for refreshing the access token. It logs a message indicating that the token is being refreshed and then calls the 'refreshAccessToken' function from the 'authService' module to perform the actual token refresh. If the token refresh is successful, it sends the new token as a response with a status code of 200. If an error occurs during the token refresh, it calls the 'next' function with the error as an argument to pass the error to the error handling middleware.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function.
 * @returns {void}
 */
async function refreshToken(req, res) {
    logger.info(`refreshing token`);

    const token = await authService.refreshAccessToken(req);
    res.status(200).send(token);
}

module.exports = { login, register, refreshToken };
