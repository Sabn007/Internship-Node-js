const express = require('express')
const router = express.Router()
const Main = require('../models/main')


router.get('/', async(req,res) => {
  
    try{
           const mains = await Main.find()
           res.json(mains)
    }catch(err){
        res.send('Error ' + err)
    }
})



router.post('/', async(req,res) => {
    const main = new Main({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })

    try{
        const a1 =  await main.save() 
        res.json(a1)
    }catch(err){
        res.send('Error Message')
    }
})
router.patch('/:id',async(req,res)=> {
    try{
        const main = await Main.findById(req.params.id) 
        main.sub = req.body.sub
        const a1 = await main.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})


module.exports = router