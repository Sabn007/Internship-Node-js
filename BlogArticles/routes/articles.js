const express = require('express')
const Article = require('./../models/article')
const { addBlog, showBlog, returnBlog } = require('../controller/blogController')

const router = express.Router()

router.get('/new',returnBlog)


router.get('/:id',showBlog)

router.post('/', addBlog)


module.exports = router