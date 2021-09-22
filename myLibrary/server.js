const express = require('express')
const app = express()
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/library').then(() => {
    // listing to server
    app.listen(3000, () => {
        console.log(`Server running on port 3000`)
        console.log('Connected to Mongoose')
    })
}).catch(err => console.log(err))

//  For Cloud Database

// mongoose.connect('mongodb+srv://testUser:test%40123@mevn.90fgg.mongodb.net/sabinDb?retryWrites=true&w=majority').then(() => {
//     // listing to server
//     app.listen(3000, () => {
//         console.log(`Server running on port 3000`)
//         console.log('Connected to Mongoose')
//     })
// }).catch(err => console.log(err))

app.set('view engine','ejs')
app.set('views',__dirname + '/views')

app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({limit :'10mb', extended:false}))

app.use('/',indexRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)
