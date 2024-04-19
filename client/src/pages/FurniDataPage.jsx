import { useEffect, useState } from "react";
import "../styles/furni_data_page.scss";
import axios from "axios";

// IMPORTING COMPONENTS
import FileInput from "../components/CropPhotoTrial/FileInput";
import CustomModal from "../components/CropPhotoTrial/Modal";
// ROUTING
import { useNavigate } from "react-router-dom";


// IMPORTING MATERIAL UI
// ================================================================================

import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from "@mui/material/styles";

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Box,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

// DATA GRID
import { DataGrid } from "@mui/x-data-grid";

const violetBase = "#248b96";

const theme = createTheme({
  palette: {
    violet: {
      main: violetBase,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetBase, "#fff") > 3 ? "#fff" : "#111",
    },
  },
});

// For CHIP (Tag MultiSelect) -----------------------------------------------------------------
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const materials = [
  'Wood',
  'Fabric',
  'Metal',
  'Leather',
  'Glass',
  'Bamboo',
  'Plastic',
  'Stone',
  'Acrylic',
  'Rubber',
  'Wax',
  'Foam',
];
// ---------------------------------------------------------------------------------
// =================================================================================



const FurniDataPage = () => {

  // CROPPER FUNCTIONS
  // ================================================================================

  const [image, setImage] = useState("");
  const [imgAfterCrop, setImgAfterCrop] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  // Callback function when an image is selected
  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
    setIsOpen(true);
  };

  // Callback function when cropping is done
  const onCropDone = (imgCroppedArea) => {
    const canvasWidth = 200;
    const canvasHeight = 200;
    // Create canvas element to crop the image
    const canvasEle = document.createElement("canvas");
    canvasEle.width = canvasWidth;
    canvasEle.height = canvasHeight;

    const context = canvasEle.getContext("2d");

    // Load the selected image
    let imageObj1 = new Image();
    imageObj1.src = image;
    imageObj1.onload = function () {
      // Draw the cropped portion of the image onto teh canvas
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        canvasWidth,
        canvasHeight
      );

      // Convert the canvas content to a data URL (base64)
      const dataURL = canvasEle.toDataURL();

      setImgAfterCrop(dataURL);
      setIsOpen(false);
      console.log(imgAfterCrop);

      // Set the imageURL to input form hidden
      // Update the input value using React state
      setFormData((prevFormData) => ({
        ...prevFormData,
        furni_picture: imgAfterCrop,
      }));
    };
  };

  // Callback function when cropping is done
  const onCropCancel = () => {
    setIsOpen(false);
    setImage("")
  };

  // =====================================================================================

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFurniIdAvailable, setIsFurniIdAvailable] = useState(true);

  const [formData, setFormData] = useState({
    furni_id: "",
    furni_name: "",
    space_cat: "",
    sub_space_cat: "",
    detail_material: "",
    furni_desc: "",
    furni_dimension: ['', '', ''],
    furni_picture: { public_id: "", url: "" },
    furni_type: "",
    furni_style: "",
    material_tag: [],
    vectary_link: "",
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
  if (name === 'furni_dimension') {
    const updatedDimension = [...formData.furni_dimension];
    updatedDimension[index] = value;
    setFormData({ ...formData, furni_dimension: updatedDimension });
  } else {
    const updatedValue = name === 'material_tag' ? (typeof value === 'string' ? value.split(',') : value) : value;
    setFormData({ ...formData, [name]: updatedValue });
  }
    setIsFurniIdAvailable(true); // Reset availability check when the ID changes
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isFurniIdAvailable) {
    try { 
      await axios.post("/api/submit-form", formData);
      alert("Furniture data saved successfully");
      // Clear form data after successful submission if needed
      setFormData({
        furni_id: "",
        furni_name: "",
        space_cat: "",
        sub_space_cat: "",
        detail_material: "",
        furni_desc: "",
        furni_dimension: ['', '', ''],
        furni_picture: { public_id: "", url: "" },
        furni_type: "",
        furni_style: "",
        material_tag: [],
        vectary_link: "",
      });

      // Reload page after success
      window.location.reload()
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again later.");
    }
  }
  };

  // HANDLE CHECK Furniture ID
  const handleFurniIdCheck = async () => {
    setLoading(true);
    try {
      console.log("Checking run")
      const response = await axios.get(`/api/checkFurnitureID/${formData.furni_id}`);
      console.log(response)
      if (response.data.status === "success" && response.data.message === "already exist") {
        setIsFurniIdAvailable(false);
        setError('Furniture ID already exists. Please choose a different one.');
      } else  {
        setIsFurniIdAvailable(true);
        setError('');
      } 
      setLoading(false);
    } catch (error) {
      console.error('Error checking furniture ID:', error);
      setError('Error checking furniture ID. Please try again later.');
      setLoading(false);
    }
  };

  const navigate = useNavigate(); // Goes to homepage

  const toggleForm = () => {
    // Blur background modal
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    // Modal Active
    var modal = document.getElementById("modal");
    modal.classList.toggle("active");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="outer-container" id="blur">
        <div className="content-container">
          <div className="side-bar">
            <div className="logo"></div>
            <div className="menu-container">
              <div className="dash-menu" onClick={() => navigate("/")}>
                <div className="icon">
                  <DashboardRoundedIcon sx={{ fontSize: 30 }} />
                </div>
                <div className="menu">Dashboard</div>
              </div>
              <div className="dash-menu selected-menu">
                <div className="icon">
                  <ListAltRoundedIcon sx={{ fontSize: 32 }} />
                </div>
                <div className="menu">Furniture Data</div>
              </div>
            </div>
          </div>
          <div className="separator"></div>
          <div className="main-part">
            <div className="top-content">
              <div className="welcome-text">Hi Andrea 🖖</div>
              <div className="account-container">
                <div className="profpic"></div>
                <div className="fullname">Adrea Hirata</div>
              </div>
            </div>
            <div className="title-page">Furniture Data</div>
            <div className="main-content">
              <div className="table-container">
                <div className="header">
                  <div className="table-title">Furnitures</div>
                  <div className="button-div">
                    <Button
                      onClick={toggleForm}
                      color="violet"
                      variant="contained"
                    >
                      <AddIcon /> Add New Data
                    </Button>
                  </div>
                </div>
                <div className="dataTable">
                  <DataGrid
                    columns={[
                      { field: "ID" },
                      { field: "First name" },
                      { field: "Last name" },
                    ]}
                    rows={[]}
                    sx={{ "--DataGrid-overlayHeight": "300px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal" id="modal">
        <div className="close-button" 
            onClick={toggleForm}>
          <CloseIcon />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="title-modal">Furniture Data Form</div>
          <div className="form-container">

            {/* LEFT SECTION */}
            <div className="left-container">

              {/* Data Form Submission Part 1 */}
              <div className="check-container">
                <div className="upper-part">
                  <TextField size="small" label="Furniture ID" name="furni_id" error={!isFurniIdAvailable} value={formData.furni_id} onChange={handleChange} fullWidth required />
                  <Button color="violet" variant="contained" onClick={handleFurniIdCheck} disabled={!formData.furni_id || loading} style={{ marginLeft: "10px", width:"150px" }} >
                    Check ID
                  </Button>
                </div>  
                <div className="lower-part">
                  {loading && (
                    <CircularProgress size={20} style={{ marginLeft: "10px" }} />
                  )}
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {!isFurniIdAvailable && (
                    <p id="div-message" style={{ color: "red" }}></p>
                  )}
                </div>
              </div>

              {/* Data Form Submission Part 2 */}
              <div className="name-container">
                <TextField sx={{ mt: 1.5 }} size="small" label="Furniture Name" name="furni_name" type="text" value={formData.furni_name} onChange={handleChange} fullWidth required />
              </div>

              {/* Data Form Submission Part 3 */}
              <div className="space-cat-container">
                <FormControl fullWidth size="small" sx={{ mt: 1.5 }}>
                  <InputLabel id="demo-select-small-label">Space Category</InputLabel>
                  <Select
                    name="space_cat"
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={formData.space_cat}
                    label="Space Category"
                    onChange={handleChange}
                    fullWidth required
                  >
                    <MenuItem value={"Indoor"}>Indoor</MenuItem>
                    <MenuItem value={"Outdoor"}>Outdoor</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {/* Data Form Submission Part 4 */}
              <div className="sub-space-cat-container">
                <FormControl fullWidth size="small" sx={{ mt: 1.5 }}>
                  <InputLabel id="demo-select-small-label">Sub Space Category</InputLabel>
                  <Select
                    name="sub_space_cat"
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={formData.sub_space_cat}
                    label="Sub Space Category"
                    onChange={handleChange}
                    fullWidth required
                  >
                    <MenuItem value={"Living Room"}>Living Room</MenuItem>
                    <MenuItem value={"Bed Room"}>Bed Room</MenuItem>
                    <MenuItem value={"Terrace"}>Terrace</MenuItem>
                    <MenuItem value={"Kitchen"}>Kitchen</MenuItem>
                    <MenuItem value={"Bathroom"}>Bathroom</MenuItem>
                    <MenuItem value={"Dining Room"}>Dining Room</MenuItem>
                    <MenuItem value={"Dressing Room"}>Dressing Room</MenuItem>
                    <MenuItem value={"Garden"}>Garden</MenuItem>
                    <MenuItem value={"Balcony"}>Balcony</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {/* Data Form Submission Part 5 */}
              <div className="furniture-type">
                <FormControl fullWidth size="small" sx={{ mt: 1.5 }}>
                  <InputLabel id="demo-select-small-label">Furniture Type</InputLabel>
                  <Select
                    name="furni_type"
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={formData.furni_type}
                    label="Furniture Type"
                    onChange={handleChange}
                    fullWidth required
                  >
                    <MenuItem value={"Coffee Table"}>Coffee Table</MenuItem>
                    <MenuItem value={"Stool"}>Stool</MenuItem>
                    <MenuItem value={"Drawer"}>Drawer</MenuItem>
                    <MenuItem value={"Armchair"}>Armchair</MenuItem>
                    <MenuItem value={"Chair"}>Chair</MenuItem>
                    <MenuItem value={"Sofa"}>Sofa</MenuItem>
                    <MenuItem value={"TV Stand"}>TV Stand</MenuItem>
                    <MenuItem value={"Side Table"}>Side Table</MenuItem>
                    <MenuItem value={"Cabinet"}>Cabinet</MenuItem>
                    <MenuItem value={"Wardrobe"}>Wardrobe</MenuItem>
                    <MenuItem value={"Dining Table"}>Dining Table</MenuItem>
                    <MenuItem value={"Mirror"}>Mirror</MenuItem>
                    <MenuItem value={"Dining Chair"}>Dining Chair</MenuItem>
                    <MenuItem value={"Pouf"}>Pou</MenuItem>
                    <MenuItem value={"Doormat"}>Doormat</MenuItem>
                    <MenuItem value={"Desk"}>Desk</MenuItem>
                    <MenuItem value={"Seat/Bench"}>Seat/ Bench</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {/* Data Form Submission Part 6 */}
              <div className="furniture-style">
                <FormControl fullWidth size="small" sx={{ mt: 1.5 }} >
                  <InputLabel id="demo-select-small-label">Furniture Style</InputLabel>
                  <Select
                    name="furni_style"
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={formData.furni_style}
                    label="Furniture Style"
                    onChange={handleChange}
                    fullWidth required
                  >
                    <MenuItem value={"Modern"}>Modern</MenuItem>
                    <MenuItem value={"Classy"}>Classy</MenuItem>
                    <MenuItem value={"Minimalism"}>Minimalism</MenuItem>
                    <MenuItem value={"Traditional"}>Traditional</MenuItem>
                    <MenuItem value={"Industrial"}>Industrial</MenuItem>
                    <MenuItem value={"Scandinavian"}>Scandinavian</MenuItem>
                    <MenuItem value={"Rustic"}>Rustic</MenuItem>
                    <MenuItem value={"Shabby Chic"}>Shabby Chic</MenuItem>
                    <MenuItem value={"Mid-Century Modern"}>Mid-Century Modern</MenuItem>
                    <MenuItem value={"Japanese Zen"}>Japanese Zen</MenuItem>
                    <MenuItem value={"Tropical/Natural"}>Tropical/Natural</MenuItem>
                    <MenuItem value={"Classic"}>Classic</MenuItem>
                    <MenuItem value={"Pop-Art"}>Pop-Art</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {/* Data Form Submission Part 7 */}
              <div className="material-tag">
                <FormControl fullWidth size="small" sx={{ mt: 1.5 }}>
                  <InputLabel id="demo-multiple-chip-label">Material Tag</InputLabel>
                  <Select
                    required
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    name="material_tag"
                    value={formData.material_tag}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {materials.map((material) => (
                      <MenuItem
                        key={material}
                        value={material}
                      >
                        {material}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              {/* Data Form Submission Part 8 */}
              <div className="detail-material">
                <TextField
                  sx={{ mt: 1.5, mb: 3 }}
                  name="detail_material"
                  id="outlined-multiline-static"
                  label="Detail Material"
                  onChange={handleChange}
                  required
                  fullWidth
                  value={formData.detail_material}
                  defaultValue={"Hello There"}
                  multiline
                  rows={2.6}
                />
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="right-container">

              {/* Data Form Submission Part 9 */}
              <div className="furniture-description">
                <TextField
                  sx={{ mb: 1.5 }}
                  name="furni_desc"
                  id="outlined-multiline-static"
                  label="Furniture Description"
                  onChange={handleChange}
                  required
                  fullWidth
                  value={formData.furni_desc}
                  multiline
                  rows={2.6}
                />
              </div>

              <div className="furni-dimension-label">
                <div className="text">Furniture Dimension</div>
                <div className="line"></div>
              </div>

              {/* Data Form Submission Part 10 */}
              <div className="furni-dimension-container">
                <div className="furni-dimension">
                  <TextField
                    name="furni_dimension"
                    size="small"
                    required
                    fullWidth
                    label="Width"
                    id="outlined-adornment-weight"
                    value={formData.furni_dimension[0]}
                    onChange={(e) => handleChange(e, 0)}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    }}
                  />
                </div>
                <div className="furni-dimension">
                  <TextField
                    name="furni_dimension"
                    size="small"
                    required
                    fullWidth
                    label="Depth"
                    id="outlined-adornment-weight"
                    value={formData.furni_dimension[1]}
                    onChange={(e) => handleChange(e, 1)}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    }}
                  />
                </div>
                <div className="furni-dimension">
                  <TextField
                    name="furni_dimension"
                    size="small"
                    required
                    fullWidth
                    label="Height"
                    id="outlined-adornment-weight"
                    value={formData.furni_dimension[2]}
                    onChange={(e) => handleChange(e, 2)}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    }}
                  />
                </div>
              </div>
              
              {/* Data Form Submission Part 11 */}
              <div className="name-container">
                <TextField sx={{ mt: 1.5, mb:1.5 }} size="small" label="Vectary Link" name="vectary_link" type="text" value={formData.vectary_link} onChange={handleChange} fullWidth required />
              </div>
              
              <div className="furni-dimension-label">
                <div className="text">Furniture Picture</div>
                <div className="line2"></div>
              </div>

              {/* Data Form Submission Part 12 */}
              <div className="furni-picture">
                <div
                  className="furni-picture-inner-container"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <FileInput onImageSelected={onImageSelected} />
                  <div className="cropped-container">
                    <img style={{ borderRadius: "15px" }} src={imgAfterCrop} />
                    <input id="url-image-input" value={formData.furni_picture} onChange={handleChange} name="furni_pic" />
                  </div>
                </div>
                <CustomModal
                  onCropDone={onCropDone}
                  onCropCancel={onCropCancel}
                  image={image}
                  isOpen={isOpen}
                  onClose={closeModal}
                >
                  This is the content of the modal.
                </CustomModal>
              </div>
            </div>
          </div>
          <div className="button-submit">
          <Button
            type="submit"
            variant="contained"
            color="violet"
            fullWidth
          >
            Submit
          </Button>
          </div>
        </form>
      </div>
    </ThemeProvider>
  );
};
export default FurniDataPage;
