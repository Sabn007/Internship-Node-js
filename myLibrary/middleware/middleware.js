const authPage = (permission)=>{
    return (req,res,next) =>{
        const userRole = req.body.role
        if(permission.includes(userRole)){
            next()
        }
        else{
            return res.status(401).json("YOu dont have a permission")
        }
    }
}


const authCRUD = (req,res,next)=>{
    const uniqueID = parseInt(req.params.id)

    if(req.body.id.includes(uniqueID)){
        next()
    }else{
        return res.status(401).json("YOu dont have access TO CRUD")
    }

}
//This is accessed by only Admin user
route.get('/users', authPage(['M']), handler)
//This is accessed by anyone
route.get('/posts', authPage(['M','U','A']))