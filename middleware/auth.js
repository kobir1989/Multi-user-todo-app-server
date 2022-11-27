const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookie.token;
  if (!token) {
    return res.status(401).json({ errorMessage: "Unauthorized" });
  }
  const validateUser = jwt.verify(token, process.env.JWT_SEC);
  req.user = validateUser.id;
  next()
};
module.exports = auth;
