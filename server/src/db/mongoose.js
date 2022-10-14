const mongoose = require("mongoose")

//Development
// mongoose
//   .connect("mongodb://127.0.0.1:27017/draggable-form", {})
//   .then(() => console.log("Connected to database "))
//   .catch((err) => console.error(`Error connecting to the database. \n${err}`))

//Production
const password = `gbWw4LX3u9eUtkUL`
const url = `mongodb+srv://pakdragoon:${password}@cluster0.o6jzh1o.mongodb.net/draggable-form-v1?retryWrites=true&w=majority&ssl=true`

mongoose
  .connect(url, {})
  .then(() => console.log("Connected to database "))
  .catch((err) => console.error(`Error connecting to the database. \n${err}`))