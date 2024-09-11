const { getUserInfoFromToken } = require("src/services/users.service");
const logger = require('src/logger');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    req.user = await getUserInfoFromToken(token);
    logger.debug("decoded user information: ", req.user);
    next();
  } catch (error) {
    logger.error(`Token verification failed: ${error}`);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = verifyToken;
