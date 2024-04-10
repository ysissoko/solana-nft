const User = require('src/models/user.model');
const HttpError = require('src/exceptions/http.error.js');

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

    return user;
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

module.exports = { login, register };
