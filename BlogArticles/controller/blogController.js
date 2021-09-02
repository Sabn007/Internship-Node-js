const Article = require('./../models/article')




exports.returnBlog = (req,res)=>{
    res.render('./articles/new',{article: new Article()})
}


exports.showBlog = async (req,res)=>{
    const article = await Article.findById(req.params.id)
    if(article ==null)res.redirect('/')
        res.render('articles/show', {article:article})
}
 exports.addAndEditBlog = (path)=> {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try {
          article = await article.save()
          res.redirect(`/articles/${article.id}`)
        } catch (e) {
          res.render(`articles/${path}`, { article: article })
        }
      }
}
exports.deleteBlog = async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
}

