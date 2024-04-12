const User = require('src/models/user.model');
const HttpError = require('src/exceptions/http.error.js');
const jwt = require('jsonwebtoken');
const config = require('src/services/config.service');

/**
 * Generates an access token for the given user.
 *
 * @param {Object} user - The user object.
 * @returns {string} - The generated access token.
 */
function generateAccessToken(user) {
    const { secret, expiresIn } = config.auth.jwt;
    delete user.password;
    return jwt.sign(user, secret, { expiresIn });
}

/**
 * Generates a refresh access token for a user.
 *
 * @param {Object} user - The user object.
 * @returns {string} - The refresh access token.
 */
function generateRefreshAccessToken(user) {
    const { secret, expiresIn } = config.auth.jwtRefresh;
    delete user.password;
    return jwt.sign(user, secret, { expiresIn });
}

/**
 * Function to log in a user.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the login was successful or not.
 * @throws {HttpError} - If the user is not found.
 */
async function login(email, password) {
    const user = await User.findOne({ email }).exec();
    
    if (!user)
        throw new HttpError(404, "User is not registered");

    if (!user.isValidPassword(password))
        throw new HttpError(400, "User password is invalid");

    return { accessToken: generateAccessToken(user._doc), refreshAccessToken: generateRefreshAccessToken(user._doc) };
}

/**
 * Register a new user.
 *
 * @param {Object} user - The user object containing email and password.
 * @param {string} user.email - The email of the user.
 * @param {string} user.password - The password of the user.
 * @returns {Promise} A promise that resolves to the newly registered user.
 */
function register(user) {
    const { email, password } = user;
    const newUser = new User({ email, password });
    return newUser.save();
}

/**
 * Generates a new access token based on the provided refresh token.
 * 
 * @param {Object} req - The request object containing the refresh token.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the new access token.
 * @throws {HttpError} - Throws a HttpError if the refresh token is not provided or is invalid.
 */
function refreshAccessToken(req) {
    const { jwt: refreshToken } = req.cookies;
    const { secret: refreshSecret } = config.auth.jwtRefresh;
    const { expiresIn, secret } = config.auth.jwt;

    if (!refreshToken) throw new HttpError(401, "Refresh token was not provided");

    return new Promise((resolve, reject) => {
            // Verifying refresh token
            jwt.verify(refreshToken, refreshSecret, { noTimestamp: true },
                (err, decoded) => {
                    const {iat, exp, ...payload} = decoded;
                    if (err) {
                        // Wrong Refesh Token
                        reject(new HttpError(401, err.message));
                    }
                    else {
                        // Correct token we send a new access token

                        const accessToken = jwt.sign(payload, secret, {
                            expiresIn
                        });
                        resolve({ accessToken });
                    }
                })
            });
}

module.exports = { login, register, refreshAccessToken };
