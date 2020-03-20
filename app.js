const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
// import routes
const toDoRoutes = require('./routes/todo')

// app
const app = express()

//middleware
app.use(express.json())

//routes 
app.use("/todos", toDoRoutes);
app.get('/', (req, res) => {
  res.json("Hello World")
})

// database 
mongoose.connect(
  process.env.DATABASE,
  {useNewUrlParser: true,
    useCreateIndex: true
  }
)
.then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});
const port = 8000

// app.listen(port, () => {
//   console.log(`server is runing on port ${port}`)
// })

module.exports = app;