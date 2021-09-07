const express = require('express')
const session = require('express-session')

const mongoose = require('mongoose')

const User = require('./models/user')
const passport = require('passport')
const localStorage = require('passport-local')
const bcrypt = require('bcrypt')
const app = express()


mongoose.connect('mongodb://localhost/login').then(() => {
    // listing to server
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000')
        console.log('database connected')
    })
}).catch(err => console.log(err))


app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: "verygoodsecret",
    resave:false,
    saveUninitialized:true
}))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//passport
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(function (user,done){
    done(null ,user.id)
})

passport.deserializeUser(function (id,done){
    //Setup user model
    User.findById(id, function (err,user){
        done(err,user)
    })
})

passport.use(new localStorage(
    function (username,password,done){
        User.findOne({username:username}, function(err,user){
            if(err) return done(err) 
            if(!user){return done(null, false), {message:'Incorrect username'}}
            bcrypt.compare(password,user.password, function(err,res){
                if(err) return done(err)

                if(res === false){
                    return done(null, false , {message :'incorrect password'})
                }
                return done(null,user)
            })
       
        })
    }
))

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
}

function isLoggedOut(req, res, next) {
	if (!req.isAuthenticated()) return next();
	res.redirect('/');
}
 // Routes
app.get('/', isLoggedIn, (req,res) =>{
    res.render('index',{title:"Home"})
})

app.get('/login',isLoggedOut,(req,res)=>{
    const response = {
        title: "Login",
        error :req.query.error
    }
    res.render('login', response)
})

app.post('/login',passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login?error=true'
}))

app.get('/logout', (req,res)=>{
    req.logout()
    res.redirect('/')
})
// Setup our admin user
app.get('/setup', async (req, res) => {
	const exists = await User.exists({ username: "admin" });

	if (exists) {
        console.log("exits");
		res.redirect('/login');
		return;
	};

	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash("pass", salt, function (err, hash) {
			if (err) return next(err);
			
			const newAdmin = new User({
				username: "admin",
				password: hash
			});

			newAdmin.save();

			res.redirect('/login');
		});
	});
});
