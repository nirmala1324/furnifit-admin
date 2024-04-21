require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("./utilities/dbcloudinary")

// Export Models
const UserModel = require("./models/Users");
const FurnitureModel = require("./models/Furnitures");

const app = express();
app.use(cors());
app.use(express.json()); // whenever data passed from frontend to backend
                         // the server will convert the data to json firstly
                         // it will goes error if not

// Connect to MongoDB
mongoose.connect(process.env.VITE_MONGODB_URL)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// TRIAL API BJIR -------------------------------------------------------------------------------------

// // API - FETCH THE DATA
// app.get("/getUsers", (req, res) => {    // req = data passing from frontend | res = from the database
//   // Get all the data from database
//   UserModel.find({}).then(function(users) {
//     res.json(users)
//   }).catch(function(err) {
//     res.json(err)
//   })
// })

// ==================================================================================================

// API - FETCH THE FURNITURE DATA
app.get("/getFurniData", async (req, res) => {    // req = data passing from frontend | res = from the database
  // Get all the data from database
  try {
    const furnitures = await FurnitureModel.find({});
    res.json(furnitures)
  } catch (err) {
    console.error("Error fetch furniture data:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// API Check Input FurnitureID Existance
app.get("/checkFurnitureID/:furnitureID", async (req, res) => {
  const { furnitureID } = req.params;
  console.log(furnitureID)

  try {
    const existingFurniture = await FurnitureModel.findOne({ furni_id: furnitureID });

    if (existingFurniture) {
      res.status(200).json({ status: "success", message: "already exist" });
    } else {
      res.status(200).json({ status: "success", data: null });
    }
  } catch (error) {
    console.error("Error checking furniture ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// API Add Data form from Client Side
app.post("/submit-form", async (req, res ) => {
  // Extracting data from the POST request body
  const { furni_id, furni_name, space_cat, sub_space_cat, detail_material, furni_desc, furni_dimension, furni_picture, furni_type, furni_style, material_tag, vectary_link } = req.body;
  
  try {
    // Add the image to Cloudinary and get response
    const result = await cloudinary.uploader.upload(furni_picture, {folder: "furnitures"}) 
    
    // Create new furniture document/ model/ schema
    const newFurnitures = await FurnitureModel.create({
      furni_id, 
      furni_name, 
      space_cat, 
      sub_space_cat, 
      detail_material, 
      furni_desc,
      furni_dimension, 
      furni_picture: {
        public_id: result.public_id,
        url: result.secure_url
      },
      furni_type, 
      furni_style, 
      material_tag, 
      vectary_link
    });
    res.status(200).json({ status: "success", message: "Saving data successfully", newFurnitures });
  } catch (err){
    console.error("Error creating furniture data: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

// API Deleting from certain furniture_id of a row data
app.delete("/deleteFurniture/:furnitureID", async (req, res) => {
  const { furnitureID } = req.params;

  try {
    const deletedFurniture = await FurnitureModel.findOneAndDelete({ furni_id: furnitureID });

    if (deletedFurniture) {
      res.status(200).json({ message: "Furniture deleted successfully" });
    } else {
      res.status(404).json({ message: "Furniture not found" });
    }
  } catch (error) {
    console.error("Error deleting furniture:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running");
});
