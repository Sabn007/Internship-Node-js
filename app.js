const express = require('express')
const path = require('path')
const app = express()
const port = 8000

app.get('/',(req,res) =>{
  res.sendFile(path.join(__dirname,"index.html"))
})
app.get('/hello/:name',(req,res) =>{
  res.send("Hello " + req.params.name)
})
app.get('/about',(req,res) =>{
  res.sendFile(path.join(__dirname,"about.html"))
})
app.get('/error',(req,res) =>{
  res.sendFile(path.join(__dirname,"error.html"))
})



app.listen(port, ()=>{
  console.log(`Node js running at http://localhost:${port}/`)
}) 