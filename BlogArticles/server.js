const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles.js')
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog').then(() => {
    // listing to server
    app.listen(3000, () => {
        console.log(`Server running on port 3000`)
        console.log('database connected')
    })
}).catch(err => console.log(err))

app.set('view engine', "ejs")


app.use(express.urlencoded({ extended :false}))
app.use(methodOverride('_method'))

app.get('/',async(req,res)=>{
   const articles = await Article.find().sort({
       createdAt:"desc"
   })
    res.render('./articles/index', {articles:articles })
})

app.use('/articles',articleRouter)
