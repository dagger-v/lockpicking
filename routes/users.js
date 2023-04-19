var express = require("express");
var router = express.Router();

// require user model
const User = require("../models/user");
const passport = require("passport");

const user_controller = require("../controllers/userController");

// create passport local strategy
passport.use(User.createStrategy());

// Serialize and Deserialize user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

/// USER ROUTE ///
router.get("/register", user_controller.register);

router.get("/login", user_controller.login);

// register user in DB
router.post("/register", user_controller.register_account);

// login user
router.post("/login", user_controller.login_account);

// Logout user
router.get("/logout", user_controller.logout);

/// SETTINGS ROUTE ///
router.get("/settings", user_controller.settings_list);

module.exports = router;
