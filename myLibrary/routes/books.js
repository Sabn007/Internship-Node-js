const express = require('express')
const router = express.Router()

const multer = require('multer')
const path = require('path')
const Book = require('../models/book')
const { createBook, allBook, newBook, getBook,editBook } = require('../controller/book')
const uploadPath = path.join('public',Book.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png','image/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter : (req,file ,callback)=>{
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

//All Book Route 
router.get('/',allBook)

//new Book route
router.get('/new',newBook)

//Create Book route
router.post('/', upload.single('cover'), createBook)


router.get('/:id',getBook)

router.get('/:id/edit',editBook)


module.exports = router