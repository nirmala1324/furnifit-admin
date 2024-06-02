require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("./utilities/dbcloudinary")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Export Models
const AdminModel = require("./models/Admins");
const FurnitureModel = require("./models/Furnitures");

// Secret Key Admin Pass
const secret_key = process.env.VITE_CLOUD_SECRET_KEY;

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
  const { furni_id, furni_name, space_cat, sub_space_cat, detail_material, furni_desc, furni_dimension, detail_dimension, furni_picture, furni_type, furni_style, material_tag, vectary_link } = req.body;
  
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
      detail_dimension,
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

// API Add Data form from Client Side
app.post("/submit-edit-form", async (req, res ) => {
  // Extracting data from the POST request body
  const { furni_id, furni_name, space_cat, sub_space_cat, detail_material, furni_desc, furni_dimension, detail_dimension, furni_picture, furni_type, furni_style, material_tag, vectary_link, public_id } = req.body;
  
  try {
    //===============================================================================
    // Updating the photo in Cloudinary
    // Check if the furni_picture is containing object or a string
    let updatedFurniPicture = {}; // Initialize updated furniture picture object
    
    if (typeof furni_picture === "string") {
      const editPublicID = public_id
      const editFurni_Picture = furni_picture

      // Delete the previous media
      if (editPublicID) {
        await cloudinary.uploader.destroy(public_id); // Delete previous media using its public_id
      }

      // Edit - upload new picture to existing public_id
      const result = await cloudinary.uploader.upload(editFurni_Picture, {
        folder: "furnitures", // Upload to the "furnitures" folder
        resource_type: "image" // Specify the resource type as image
      });

      // Update updatedFurniPicture with new public_id and url from Cloudinary
      updatedFurniPicture = {
        public_id: result.public_id,
        url: result.secure_url
      };
      // Correct assignment to updatedFurniPicture
      updatedFurniPicture = updatedFurniPicture;
    } else {
      updatedFurniPicture = furni_picture;
    }
    //===============================================================================
    
    // Create or update the furniture document in MongoDB
    const updatedFurniture = await FurnitureModel.findOneAndUpdate(
      { furni_id: furni_id }, // Search for furniture document by furni_id
      { 
        $set: { // Set new values for the document fields
          furni_name, 
          space_cat, 
          sub_space_cat, 
          detail_material, 
          furni_desc,
          furni_dimension, 
          detail_dimension,
          furni_picture: updatedFurniPicture, // Updated furniture picture
          furni_type, 
          furni_style, 
          material_tag, 
          vectary_link 
        }
      },
      { new: true, upsert: true } // Options: return the modified document and create if not exists
    );
    res.status(200).json({ status: "success", message: "Data of " + furni_name + " updated successfully", updatedFurniture });
  } catch (err){
    console.error("Error updating furniture data: ", err);
    res.status(500).json({ message: "Error updating furniture data" });
  }
})


// API Deleting from certain furniture_id of a row data
app.delete("/deleteFurniture/:furnitureID", async (req, res) => {
  const { furnitureID } = req.params;

  try {
    // Find the furniture document in the database
    const deletedFurniture = await FurnitureModel.findOneAndDelete({ furni_id: furnitureID });
  
    // Check if furniture was found and deleted
    if (!deletedFurniture) {
      // Furniture not found
      return res.status(404).json({ message: "Furniture not found" });
    }
  
    // Extract the publicID of the associated image
    const publicID = deletedFurniture.furni_picture.public_id;
  
    // Delete the image from Cloudinary
    const deleteResult = await cloudinary.uploader.destroy(publicID, function(result) { console.log(result) });

  
    // Check if image deletion was successful
    if (deleteResult.result === 'ok') {
      // Image deleted successfully from Cloudinary
      return res.status(200).json({ message: "Furniture and associated image deleted successfully" });
    } else {
      // Failed to delete image from Cloudinary
      console.error("Failed to delete image from Cloudinary:", deleteResult);
      return res.status(500).json({ message: "Failed to delete image from Cloudinary" });
    }
  } catch (error) {
    // Handle any errors
    console.error("Error deleting furniture:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// ==================================================================================================
// API FOR DASHBOARD

// Get data for charts
app.get('/dataToCharts', async (req, res) => {
  try {
    const entities = ['material_tag', 'furni_type', 'furni_style', 'sub_space_cat']; // Add more entities if needed

    const totalCountPromise = FurnitureModel.countDocuments(); // Count all documents in the FurnitureModel collection

    const promises = entities.map(entity => {
      return FurnitureModel.aggregate([
        { $unwind: `$${entity}` }, // Unwind the array of labels
        { $group: { _id: `$${entity}`, total: { $sum: 1 } } }
      ])
      .then(results => {
        return {
          entity,
          data: results.map((result, index) => ({
            id: index,
            value: result.total,
            label: result._id || 'Unknown' // If _id is null or undefined, set label to 'Unknown'
          }))
        };
      });
    });

    const [totalCount, aggregatedData] = await Promise.all([totalCountPromise, Promise.all(promises)]);

    res.json({ totalCount, aggregatedData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// ==================================================================================================
// API FOR ADMIN LOGIN

// Login API
app.post('/login', async (req, res) => {
  console.log(secret_key);
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);

  // Hash the password with the generated salt
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword)

  // Find user by email
  const admin = await AdminModel.findOne({ username });
  if (!admin) {
    return res.status(404).json({ message: 'admin not found' });
  }

  // Validate password
  const validPassword = await AdminModel.findOne({ password });
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  const adminData = await AdminModel.find({ username: 'nirmala' });

  // Create and send JWT token
  const token = jwt.sign({ id: admin._id }, secret_key, { expiresIn: '1h' });
  res.json({ token, adminData });
});



app.listen(3001, () => {
  console.log("Server is running");
});
