const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./router/authRouter.js");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
mongoose.connect("mongodb://localhost/loginJWT", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000, ()=>{
    console.log("Server running at port 3000")
    console.log('Connected to Mongoose')
  }))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser)
app.get("/", (req, res) => res.render("home"));
app.get("/mainPage", requireAuth, (req, res) => res.render("mainPage"));
app.use(authRouter);

//cookies
app.get("/set-cookies", (req, res) => {
  res.cookie("name", "sabin");
});
