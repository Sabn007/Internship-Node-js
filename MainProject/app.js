const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter.js");
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");
app.set('view engine','ejs')
app.set('views',__dirname + '/views')

app.set('layout','layouts/layout')

// database connection
// mongoose.connect("mongodb://localhost/loginJWT", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then((result) => app.listen(3000, ()=>{
//     console.log("Server running at port 3000")
//     console.log('Connected to Mongoose')
//   }))
//   .catch((err) => console.log(err));

//  For Cloud Database

mongoose.connect('mongodb+srv://testUser:test1234@mevn.90fgg.mongodb.net/sabinDb?retryWrites=true&w=majority').then(() => {
    // listing to server
    app.listen(5000, () => {
        console.log(`Server running on port 3000`)
        console.log('Connected to Mongoose')
    })
}).catch(err => console.log(err))

// routes
app.get("*", checkUser)
app.get("/", (req, res) => res.render("home"));
app.get("/index", requireAuth, (req, res) => res.render("index"));
app.use(expressLayouts)
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({limit :'10mb', extended:false}))

app.use(authRouter);
app.use('/',indexRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)


//cookies
app.get("/set-cookies", (req, res) => {
  res.cookie("name", "sabin");
});
