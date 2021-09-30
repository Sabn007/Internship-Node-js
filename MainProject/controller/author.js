
const Author = require('../models/author')
const Book = require('../models/book')

exports.getAuthor = (req,res)=>{
    res.render('authors/new',{author: new Author()})
}
exports.editAuthor = async(req,res)=>{
    try {
        const author =await Author.findById(req.params.id)
        res.render('authors/edit',{author: author})
    } catch  {
        res.redirect('/authors')
    }
   
}
exports.allAuthor = async(req,res)=>{
    let searchOptions = {}
    if(req.query.name != null && req.query.name !==''){

        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index',{
            authors: authors,
            searchOptions: req.query
        })
    }catch{res.redirect('/')}
    
}

exports.createAuthor = async (req,res)=>{
    const author = new Author({
        name:req.body.name
    })
    try{
        const newAuthor = await author.save()
        res.redirect(`authors/${author.id}`)
        
    }catch{
        res.render('authors/new', {
            author :author,
            errorMessage: "Error creating Author"
         })
    }
    
    
}
exports.updateAuthor = async (req,res)=>{
   let author 
    try{
        author = await Author.findById(req.params.id)
       author.name = req.body.name
        await author.save()
        res.redirect(`/authors/${author.id}`)
       
    } catch{
        if(author == null){
            res.redirect('/')
        }
        else{

            res.render('authors/edit', {
                author :author,
                errorMessage: "Error updating Author"
            })
        }
    }
    
    
}
exports.deleteAuthor = async (req,res)=>{
   let author 
    try{
        author = await Author.findById(req.params.id)
       
        await author.remove()
        
        res.redirect(`/authors`)
       
    } catch{
        if(author == null){
            res.redirect('/')
        }
        else{

            res.redirect(`/authors/${author.id}`)
        }
    }
    
    
}

exports.showAuthor = async (req,res) =>{
    try {
        const author = await Author.findById(req.params.id)
        const books = await Book.find({author : author.id}).limit(6).exec()
        res.render('authors/show',{
            author :author,
            booksByAuthor :books
        })
       
    } catch (err) {
    console.log(err);{
        res.redirect('/')
    }
}
}