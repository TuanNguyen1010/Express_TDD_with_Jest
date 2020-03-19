const express = require('express');

// app
const app = express()


// routes 
app.get('/', (req, res) => {
  res.json("Hello World")
})


const port = 8000

app.listen(port, () => {
  console.log(`server is runing on port ${port}`)

})