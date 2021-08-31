const Article = require('./../models/article')


exports.addBlog = async (req,res)=>{
    let article = new Article({
        title :req.body.title,
        description :req.body.description,
        markdown :req.body.markdown,
    })
    try{
       article =  await article.save()
       res.redirect(`/articles/${article.id}`)
    
    }catch(e){
        res.render('articles/new', {article :article})
    }
    }

exports.returnBlog = (req,res)=>{
    res.render('./articles/new',{article: new Article()})
}


exports.showBlog = async (req,res)=>{
    const article = await Article.findById(req.params.id)
    if(article ==null)res.redirect('/')
        res.render('articles/show', {article:article})
}