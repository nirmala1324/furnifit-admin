const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users") // export users model

const app = express();
app.use(cors());
app.use(express.json()); // whenever data passed from frontend to backend
                         // the server will convert the data to json firstly
                         // it will goes error if not

// Connect to MongoDB
mongoose.connect("mongodb+srv://nirmalapusparatna20031107:npr20031107@cluster0.cqhgovi.mongodb.net/dbfurnifit")

// API - FETCH THE DATA
app.get("/getUsers", (req, res) => {    // req = data passing from frontend | res = from the database
  // Get all the data from database
  UserModel.find({}).then(function(users) {
    res.json(users)
  }).catch(function(err) {
    res.json(err)
  })
})

// API - POST DATA (INSERTING DATA)
app.post("/createUser", async (req, res) => {
  // Code to insert a record to database
  // Getting the data
  const user = req.body               // The data will be attached to the body
  // Creating new user model and pass the 'user' data
  const newUser = new UserModel(user) 
  await newUser.save()                // Saving the record

  res.json(user)                      // Get the response (success or not)
})

app.listen(3001, () => {
  console.log("Server is running");
});
