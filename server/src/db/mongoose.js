const mongoose = require("mongoose")

//Development
mongoose
  .connect("mongodb://127.0.0.1:27017/draggable-form", {})
  .then(() => console.log("Connected to database "))
  .catch((err) => console.error(`Error connecting to the database. \n${err}`))

//Production
// const password = `tdfxd0aog3QYV94x`
// const url = `mongodb+srv://user1:${password}@cluster0.ld4pg.mongodb.net/async-now?retryWrites=true&w=majority&ssl=true`

// mongoose
//   .connect(url, {})
//   .then(() => console.log("Connected to database "))
//   .catch((err) => console.error(`Error connecting to the database. \n${err}`))