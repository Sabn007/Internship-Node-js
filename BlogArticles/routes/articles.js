const express = require('express')
const Article = require('./../models/article')
const {  showBlog, returnBlog, deleteBlog, addAndEditBlog} = require('../controller/blogController')

const router = express.Router()

router.get('/new',returnBlog)


router.get('/edit/:id', async (req,res) =>{
    const article = await Article.findById(req.params.id)
    
    res.render('articles/edit', {article:article})

})


router.get('/:id',showBlog)



router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
  }, addAndEditBlog('new'))
  
  router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
  }, addAndEditBlog('edit'))


router.delete('/:id', deleteBlog)


module.exports = router