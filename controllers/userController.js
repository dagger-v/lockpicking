// require user model
const User = require("../models/user");
const passport = require("passport");

exports.register = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("register");
  }
};

exports.login = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("login");
  }
};

exports.register_account = async (req, res) => {
  try {
    const registerUser = await User.register(
      { username: req.body.username },
      req.body.password
    );
    if (registerUser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    } else {
      res.redirect("/register");
    }
  } catch (err) {
    res.send(err);
  }
};

exports.login_account = (req, res) => {
  // Create new user object
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  // Check if credentials are correct
  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    }
  });
};

exports.logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
