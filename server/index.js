const express = require("express")
require("./src/db/mongoose")
const dataRouter = require("./src/routers/data")
const userRouter = require("./src/routers/user")
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

//Check if server is running
app.listen(port, () => console.log("Server is up running " + port))
