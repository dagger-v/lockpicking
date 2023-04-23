var createError = require("http-errors");
var express = require("express");
const session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const helmet = require("helmet");

require("dotenv").config();
const bodyParser = require("body-parser");
const passport = require("passport");
const ejs = require("ejs");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog");

var app = express();

// setup session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// initialize passport
app.use(passport.initialize());

// use passport to deal with session
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});

// helmet
app.use(helmet());
app.use(helmet.noSniff());
app.use(helmet.frameguard("deny"));

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// const mongoDB =
//   "mongodb+srv://admin:pokemon@cluster0.ntpwavw.mongodb.net/?retryWrites=true&w=majority";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.DB_CONNECT);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", catalogRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// disable express powered by
app.disable("x-powered-by");

module.exports = app;
