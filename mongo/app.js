const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/SabinDB'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const mainRouter = require('./routes/mains')
app.use('/mains',mainRouter)

app.listen(9000, () => {
    console.log('Server started')
})