const express = require('express')
const { allAuthor, createAuthor, getAuthor,editAuthor, updateAuthor, deleteAuthor, showAuthor} = require('../controller/author')
const { requireAuth, checkUser } = require("../middleware/authMiddleware");


const router = express.Router()

//All authors Route
router.get('/',allAuthor)

//new Author route
router.get('/new',getAuthor)

//Create Author route
router.post('/',requireAuth,createAuthor)

router.get('/:id',showAuthor)
router.get('/:id/edit', editAuthor)

router.put('/:id',updateAuthor)
router.delete('/:id', deleteAuthor)


module.exports = router