const express = require('express')
const Article = require('./../models/article')
const { addBlog, showBlog, returnBlog, deleteBlog, editBlog} = require('../controller/blogController')

const router = express.Router()

router.get('/new',returnBlog)


router.get('/edit/:id', async (req,res) =>{
    const article = await Article.findById(req.params.id)
    
    res.render('articles/edit', {article:article})

})


router.get('/:id',showBlog)



router.post('/',addBlog)

router.put('/:id',editBlog)


router.delete('/:id', deleteBlog)


module.exports = router