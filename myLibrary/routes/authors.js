const express = require('express')
const { allAuthor, createAuthor, getAuthor } = require('../controller/author')



const router = express.Router()

//All authors Route
router.get('/',allAuthor)

//new Author route
router.get('/new',getAuthor)

//Create Author route
router.post('/',createAuthor)
module.exports = router