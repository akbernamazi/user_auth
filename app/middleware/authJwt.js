const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  req.headers = req.body.headers;
  let token = req.headers["x-access-token"];
  console.log(token);

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    res.send(200);
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
