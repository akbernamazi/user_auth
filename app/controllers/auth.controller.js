const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  console.log(req.body);
  User.create({
    username: req.body.username,
    email: req.body.email,
    phno: req.body.phno,
    password: bcrypt.hashSync(req.body.password, 8),
  }).then(function (users) {
    if (users) {
      res.status(200).send(users);
    } else {
      res.status(400).send({ message: "Error in creating new record" });
    }
  });
};

exports.verify = (req, res) => {
  res.status(200).send({ message: "Success" });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        phno: user.phno,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.remove = (req, res) => {
  console.log(req.body);
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    User.destroy({
      where: {
        username: req.body.username,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(400).send({ message: "Fail" });
        } else {
          return res.status(200).send({ message: "Success" });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });
};

exports.update = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.oldpassword,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: req.headers["x-access-token"],
          message: "Invalid Password!",
        });
      }
      (req.body.password = bcrypt.hashSync(req.body.newpassword, 8)),
        User.update(req.body, { where: { username: req.body.username } });
      res.status(200).send("Success");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
