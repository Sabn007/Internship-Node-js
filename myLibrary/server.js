const express = require('express')
const app = express()
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/library').then(() => {
    // listing to server
    app.listen(3000, () => {
        console.log(`Server running on port 3000`)
        console.log('Connected to Mongoose')
    })
}).catch(err => console.log(err))

app.set('view engine','ejs')
app.set('views',__dirname + '/views')

app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use(bodyParser.urlencoded({limit :'10mb', extended:false}))

app.use('/',indexRouter)
app.use('/authors',authorRouter)
