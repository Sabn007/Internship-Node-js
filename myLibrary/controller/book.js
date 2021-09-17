const path = require('path')
const fs = require('fs')
const Author = require('../models/author')
const Book = require('../models/book')
const uploadPath = path.join('public',Book.coverImageBasePath)


exports.newBook = async (req,res)=>{
    renderNewPage(res, new Book())
    
}

exports.allBook = async(req,res)=>{
    let query = Book.find()
    if(req.query.title != null && req.query.title != " "){
        query = query.regex('title',new RegExp(req.query.title,'i'))
    }
    if(req.query.publishBefore != null && req.query.publishBefore != " "){
        query = query.lte('publishDate',req.query.publishBefore)
    }
    if(req.query.publishAfter != null && req.query.publishAfter != " "){
        query = query.gte('publishDate',req.query.publishAfter)
    }
   
    try {
        const books = await query.exec()
        res.render('books/index',{
            books:books,
            searchOptions:req.query
            
            })
        
    } catch  {
        res.redirect('/')
        
    }
   
   }
exports.createBook = async (req,res)=>{
    const fileName = req.file != null ? req.file.filename : null
    const book = new Book({
        title :req.body.title,
        author :req.body.author,
        publishDate :req.body.publishDate,
        pageCount :req.body.pageCount,
        coverImageName :fileName,
        description :req.body.description,
    }) 
    try{
        const newBook = await book.save()
        res.redirect('books')
    }
    catch{
        if(book.coverImageName != null){

            removeBookCover(book.coverImage)
        } 
        renderNewPage(res,book, true)
        }
    
    
}

function removeBookCover (fileName){
    fs.unlink(path.join(uploadPath ,fileName),err =>{
      if(err) console.error(err)  
    })
}
async function renderNewPage(res, book, hasError = false){
    try{
        const authors = await Author.find({})
        const params = {
            authors:authors,
            book:book
        }
        if(hasError) params.errorMessage = 'Error Creating Book'
        res.render('books/new', params)
    
    
     }catch{
        res.redirect('/books')
     }
}