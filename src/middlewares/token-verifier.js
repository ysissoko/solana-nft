const config = require("src/services/config.service");

module.exports = (role = 'user') => (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
  
    if (!token) 
      return res.status(401).send("Token not provided");
    else if (user.role != role) {
      return res.status(401).send("Access forbidden!");
    }
  
    jwt.verify(token, config.auth.jwt.secret, (err, user) => {
      if (err) {
        return res.status(401).send("Invalid / Malformed token");
      }
      req.user = user;
      next();
    });
}
