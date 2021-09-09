const User = require('./../models/user')
const bcrypt = require("bcrypt");

exports.localStorageFun = (username, password, done) =>{
    User.findOne({ username: username }, function (err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false), { message: "Incorrect username" };
      }
      bcrypt.compare(password, user.password, function (err, res) {
        if (err) return done(err);

        if (res === false) {
          return done(null, false, { message: "incorrect password" });
        }
        return done(null, user);
      });
    });
  }

exports.registerUser =  async (req, res) => {
    try {
      let foundUser = await User.findOne({ username :req.body.username});
      console.log('foundUser',foundUser);
      if (!foundUser) {
        let hashPassword = await bcrypt.hash(req.body.password, 10);
  
        let newUser = new User( {
          
          username: req.body.username,
          email: req.body.email,
          password: hashPassword,
        });
        const savedUser = await newUser.save()
        console.log("Saved User", savedUser);
        if(savedUser)
        {res.render('register_success') }    
      } else {
        res.render('user_exists')
      }
    } catch {
      res.send("Internal server error");
    }
  }

exports.setupAdmin = async (req, res) => {
    const exists = await User.exists({ username: "admin" });
  
    if (exists) {
      console.log("exits");
      res.redirect("/login");
      return;
    }
  
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash("pass", salt, function (err, hash) {
        if (err) return next(err);
  
        const newAdmin = new User({
          username: "admin",
          password: hash,
        });
  
        newAdmin.save();
  
        res.redirect("/login");
      });
    });
  }