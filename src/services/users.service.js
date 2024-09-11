const admin = require("src/services/firebase.service");

/**
 * Retrieves user information from a Firebase authentication token.
 *
 * @async
 * @function getUserInfoFromToken
 * @param {string} token - The Firebase authentication token.
 * @returns {Promise<Object>} An object containing the user's id, email, and name.
 * @throws {Error} If the token is invalid or expired.
 */
async function getUserInfoFromToken(token) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, email, name } = decodedToken;
        return { id: uid, email, name };
    } catch (error) {
        console.error('Error verifying Firebase token:', error);
        throw new Error('Invalid or expired token');
    }
}

module.exports = { getUserInfoFromToken }
