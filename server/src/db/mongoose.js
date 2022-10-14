const mongoose = require("mongoose")

//Development
mongoose
  .connect("mongodb://127.0.0.1:27017/draggable-form", {})
  .then(() => console.log("Connected to database "))
  .catch((err) => console.error(`Error connecting to the database. \n${err}`))

//Production
// const password = ``
// const url = ``

// mongoose
//   .connect(url, {})
//   .then(() => console.log("Connected to database "))
//   .catch((err) => console.error(`Error connecting to the database. \n${err}`))