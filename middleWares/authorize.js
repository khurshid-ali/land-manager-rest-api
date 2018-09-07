const config = require("config");
const jwt = require("jsonwebtoken");

const authorize = function(req, resp, next) {
  var token = req.header("x-auth-token");
  if (!token)
    return resp
      .status(401)
      .send("invalid authentication token. call api/login to login.");

  try {
    const payLoad = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = payLoad;
    next();
  } catch (ex) {
    resp
      .status(401)
      .send("invalid authentication token. call api/login to login.");
  }
};

module.exports = authorize;
