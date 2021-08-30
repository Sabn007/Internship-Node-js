const express = require('express')
const path = require('path')
const app = express()
const port = 8000

app.get('/',(req,res) =>{
  res.sendFile('index.html',{root:__dirname})
})
app.get('/hello/:name',(req,res) =>{
  res.send("Hello " + req.params.name)
})
app.get('/about',(req,res) =>{
  res.sendFile(path.join(__dirname,"about.html"))
})
app.use('/error',(req,res) =>{
  res.sendFile(path.join(__dirname,"error.html"))
})



app.listen(port, ()=>{
  console.log(`Node server running at http://localhost:${port}/`)
}) 