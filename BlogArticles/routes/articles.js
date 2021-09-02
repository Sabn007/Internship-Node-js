const express = require('express')
const Article = require('./../models/article')
const { addBlog, showBlog, returnBlog, deleteBlog} = require('../controller/blogController')

const router = express.Router()

router.get('/new',returnBlog)


router.get('/edit/:id', async (req,res) =>{
    const article = await Article.findById(req.params.id)
    console.log(article)
    res.render('articles/edit', {article:article})

})


router.get('/:id',showBlog)

router.post('/', addBlog)

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
  },addBlog)


router.delete('/:id', deleteBlog)

module.exports = router