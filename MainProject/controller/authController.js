const User = require("../models/Users");
const jwt = require("jsonwebtoken");

//Handle errors
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  //Incorrect email
  if (err.message === "Incorrect email") {
    errors.email = "This email is not registered";
  }

  //Incorrect password
  if (err.message === "Incorrect password") {
    errors.password = "Please enter correct password";
  }

  //Duplicate error code
  if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "SABIN SECRET CODE", {
    expiresIn: maxAge,
  });
};

const signup_get = (req, res) => {
  res.render("signup");
};
const login_get = (req, res) => {
  res.render("login", { layout: false });
};

//HANDLE SIGNUP POST REQUESTS
const signup_post = (req, res) => {
  const { email, password } = req.body;

  User.create({ email, password })
    .then((user) => {
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id });
    })
    .catch((err) => {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    });
};

//HANDLE LOGIN POST REQUESTS
const login_post = (req, res) => {
  const { email, password } = req.body;
  User.login(email, password)
    .then((user) => {
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    })
    .catch((err) => {
      console.log(err);
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    });
};

//LOGOUT USER
const logout_get = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get,
};
