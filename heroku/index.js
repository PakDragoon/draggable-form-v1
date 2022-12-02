const express = require("express")
require("./src/db/mongoose")
const dataRouter = require("./src/routers/data")
const userRouter = require("./src/routers/user")
const path = require('path');
const app = express()
const port = process.env.PORT || 8000

//Result in JSON format
app.use(express.json())

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
  next()
})

//Routes
app.use('/user', userRouter)
app.use('/data', dataRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static( 'client/build' ));
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
  });
}

//Check if server is running
app.listen(port, () => console.log("Server is up running " + port))
