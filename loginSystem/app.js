const express = require("express");
const session = require("express-session");

const mongoose = require("mongoose");

const User = require("./models/user");
const passport = require("passport");
const localStorage = require("passport-local");

const app = express();

const {registerUser,setupAdmin,localStorageFun} = require('./Controller/controller')
const {home,login,logout} = require('./Controller/getPostController')

mongoose
  .connect("mongodb://localhost/login")
  .then(() => {
    // listing to server
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
      console.log("database connected");
    });
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: "verygoodsecret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  //Setup user model
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new localStorage(localStorageFun)
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect("/");
}
// Routes
app.get("/", isLoggedIn, home);

app.get("/login", isLoggedOut,login);

app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?error=true",
  })
);

app.get("/logout",logout);
app.get("/register", (req, res) => {
  res.render("register");
});

// For Registration
app.post("/register",registerUser);

// Setup our admin user
app.get("/setup", setupAdmin);
