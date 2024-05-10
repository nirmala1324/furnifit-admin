import { useEffect, useState } from "react";
import "../styles/furni_data_page.scss";
import axios from "axios";

// IMPORTING COMPONENTS
import FileInput from "../components/CropPhoto/FileInput";
import CustomModal from "../components/CropPhoto/Modal";
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
  Stack,
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
  Alert,
  Collapse,
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

// DATA GRID
import { DataGrid } from "@mui/x-data-grid";
import DeleteConfirmation from "../components/CRUDFunctionality/DeleteConfirmation";

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

// For CHIP (Tag MultiSelect) ------------------------------------------------------
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
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFurniIdAvailable, setIsFurniIdAvailable] = useState(true);

  // MESSAGES
  const [alertMessage, setAlertMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertErrorMessage, setAlertErrorMessage] = useState('');
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  // EDIT STATE
  const [publicID, setPublicID] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const stateObjFormData = {
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
  }

  const [formData, setFormData] = useState(stateObjFormData);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'furni_dimension') {
      const updatedDimension = [...formData.furni_dimension];
      updatedDimension[index] = value;
      setFormData(prevFormData => ({ ...prevFormData, furni_dimension: updatedDimension }));
    } else {
      const updatedValue = name === 'material_tag' ? (typeof value === 'string' ? value.split(',') : value) : value;
      setFormData(prevFormData => ({ ...prevFormData, [name]: updatedValue }));
    }
  };

  useEffect(() => {
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isFurniIdAvailable) {
    try { 
      const response = await axios.post("https://furnifit-admin-backend.vercel.app/submit-form", formData);
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
      toggleForm;
      setAlertMessage(response.data.message);
      setOpenAlert(true);
    } catch (error) {
      setAlertErrorMessage("Error submitting form. Please try again later.")
      setOpenErrorAlert(true)
    }
  } else {
    setAlertErrorMessage("The furniture ID is already exists")
    setOpenErrorAlert(true)
  }
  };
  
  // EDIT FORM HANDLING ===========================================================

  const handleModalEditClose = () => {
    toggleForm();
    setIsEdit(false);
    setFormData(stateObjFormData)
  }

  const handleEdit = (rowData) => {    // Handle the data set to modal - the one injected to edit button
    setIsEdit(true);
    setFormData(rowData); 
    setPublicID(rowData.furni_picture.public_id);
    toggleForm();
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try { 
      const response = await axios.post("https://furnifit-admin-backend.vercel.app/submit-edit-form", formData);
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
      if (publicID) {
        formData.public_id = publicID;
      }
      toggleForm;
      setAlertMessage(response.data.message);
      setOpenAlert(true);
    } catch (error) {
      setAlertErrorMessage("Error editing data of " + formData.furni_name + ". Please try again later.")
      setOpenErrorAlert(true)
    }
    console.log(isEdit, publicID, formData);
  };

  // HANDLE CHECK Furniture ID
  const handleFurniIdCheck = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://furnifit-admin-backend.vercel.app/checkFurnitureID/${formData.furni_id}`);
      if (response.data.status === "success" && response.data.message === "already exist") {
        setIsFurniIdAvailable(false);
        setError('Furniture ID already exists. Please choose a different one.');
      } else  {
        setIsFurniIdAvailable(true);
        setError('');
      } 
      setLoading(false);
    } catch (error) {
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
  // ================================================================================
  // SET DATA TO DATA GRID
  const [furnitures, setFurnitures] = useState([]);
  
  // Get Data
  useEffect(() => {
    axios.get('https://furnifit-admin-backend.vercel.app/getFurniData')
    .then(response => {
      // Add a unique 'id' property to each row
      const rowsWithId = response.data.map(row => ({ ...row, id: row.furni_id }));
      setFurnitures(rowsWithId);
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);

  
  // DELETE FURNITURE DATA ===============================================================
  const handleDelete = async (furnitureID, furnitureName) => {
    try { 
      const response = await axios.delete(`https://furnifit-admin-backend.vercel.app/deleteFurniture/${furnitureID}`);
      setAlertMessage(response.data.message);
      setOpenAlert(true);
    } catch (error) {
      console.error("Error deleting furniture:", error.response.data.message);
      // Handle error as needed
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    // Reload page after success
    navigate('/') 
  };

  const handleCloseErrorAlert = () => {
    setOpenErrorAlert(false);
  };
  // =====================================================================================


  // Set Column
  const columns = [
    { field: 'furni_id', headerName: 'ID', width: 90 },
    { field: 'furni_name', headerName: 'Name', width: 150 },
    { field: 'space_cat', headerName: 'Space Category', width: 120 },
    { field: 'sub_space_cat', headerName: 'Sub Space Category', width: 150 },
    { field: 'furni_style', headerName: 'Style', width: 120 },
    { field: 'material_tag', headerName: 'Material Tag', width: 150 },
    { field: 'detail_material', headerName: 'Detail Material', width: 250, 
    renderCell: (params) => (
      <TextField
        sx={{ mt: 1 }}
        id="outlined-multiline-static"
        size="small"
        fullWidth
        value={params.row.detail_material}
        multiline
        rows={4.2}
      />)},
    { field: 'furni_desc', headerName: 'Description', width: 300, 
    renderCell: (params) => (
      <TextField
        sx={{ mt: 1 }}
        id="outlined-multiline-static"
        size="small"
        fullWidth
        value={params.row.furni_desc}
        multiline
        rows={4.2}
      />)},
    { field: 'furni_dimension', headerName: 'Dimension', width: 150, 
      renderCell: (params) => (params.row.furni_dimension[0] + " x " + params.row.furni_dimension[1] + " x " + params.row.furni_dimension[2] + " mm") 
    },
    { field: 'furni_picture', headerName: 'Picture', width: 150, renderCell: (params) => (<img src={params.row.furni_picture.url} alt="Furniture" style={{ width: '100%' }}/>)},
    { field: 'furni_type', headerName: 'Type', width: 130 },
    { field: 'vectary_link', headerName: 'Vectary Link', width: 200, 
    renderCell: (params) => (
      <TextField
        sx={{ mt: 1 }}
        id="outlined-multiline-static"
        size="small"
        fullWidth
        value={params.row.vectary_link}
        multiline
        rows={4.2}
      />)},
    {
      field: 'action',
      headerName: 'Action',
      width: 210,
      renderCell: (params) => (
        <div style={{display: "flex", gap: "2%", justifyContent:"center", alignItems: "center", height: "100%", width: "100%"}}>
        <Button variant="contained" color="violet" onClick={() => handleEdit(params.row)}>
          Edit
        </Button>
        <DeleteConfirmation furnitureID={params.row.id} furnitureName={params.row.furni_name} onDelete={handleDelete} />
        </div>
      ),
    },
  ];
  
  // ================================================================================

  // ================================================================================
  // CROPPER FUNCTIONS

  const [image, setImage] = useState("");
  const [imgAfterCrop, setImgAfterCrop] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const targetSizeInBytes = 1024 * 1024 * 3; // 3MB

  function resizeAndCompressBase64Image(base64Image, targetSizeInKB) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64Image;
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const MAX_WIDTH = 800; // Max width for resizing
        const MAX_HEIGHT = 600; // Max height for resizing
        let width = img.width;
        let height = img.height;
  
        // Resize the image while maintaining aspect ratio
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
  
        canvas.width = width;
        canvas.height = height;
  
        ctx.drawImage(img, 0, 0, width, height);
  
        // Initialize quality for compression
        let quality = 3; // Initial quality
  
        // Convert canvas to base64-encoded image with specified quality
        let resizedBase64Image = canvas.toDataURL('image/jpeg', quality); // Initial conversion
  
        // Binary search to find the optimal quality for target file size
        let lower = 0;
        let upper = 1;
        let iterations = 0;
  
        while (iterations < 10) { // Limit iterations to avoid infinite loop
          resizedBase64Image = canvas.toDataURL('image/jpeg', quality);
          const sizeInBytes = resizedBase64Image.length * 3 / 4; // Estimate size based on base64 encoding
  
          if (sizeInBytes < targetSizeInKB * 1024) {
            lower = quality;
          } else {
            upper = quality;
          }
  
          quality = (lower + upper) / 2;
          iterations++;
        }
  
        // Final conversion with optimized quality
        resizedBase64Image = canvas.toDataURL('image/jpeg', quality);
  
        resolve(resizedBase64Image);
      };
  
      img.onerror = () => {
        reject(new Error('Failed to load the image.'));
      };
    });
  }

  // Callback function when an image is selected
  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
    setIsOpen(true);
  };

  // Callback function when cropping is done
  // Callback function when cropping is done
  const onCropDone = (imgCroppedArea) => {
    const canvasWidth = 200;
    const canvasHeight = 200;
    // Create canvas element to crop the image
    const canvasEle = document.createElement("canvas");
    canvasEle.width = canvasWidth;
    canvasEle.height = canvasHeight;
  
    const context = canvasEle.getContext("2d");
  
    // Create an Image object with the base64 image data
    let imageObj1 = new Image();
    imageObj1.src = image; // Assuming 'image' contains the base64 image data
  
    imageObj1.onload = function () {
      // Draw the cropped portion of the image onto the canvas
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
  
      // Resize and compress the base64 image if necessary
      resizeAndCompressBase64Image(dataURL, targetSizeInBytes) // Check if image exceeds 100KB and resize if necessary
        .then(resizedImage => {
          setImgAfterCrop(resizedImage);
          setIsOpen(false);
        })
        .catch(error => {
          console.error('Error resizing and compressing image:', error);
          // Handle error
        });
    };
  };

  useEffect(() => {
    // Update the formData when imgAfterCrop changes
    setFormData(prevFormData => ({
      ...prevFormData,
      furni_picture: imgAfterCrop,
    }));
  }, [imgAfterCrop]);

  // Callback function when cropping is done
  const onCropCancel = () => {
    setIsOpen(false);
    setImage("")
  };

  // =====================================================================================



  return (
    <ThemeProvider theme={theme}>
      {/* Alert component */}
      <Stack sx={{ width: '100%', mt: 2, position: "absolute", top: 0, left: 0, right: 0, zIndex: "2", textAlign: "center" }} spacing={2}>
        <Collapse in={openAlert} style={{ width: "100%" }}>
          <Alert
            style={{ width: "40%", margin: "0 auto" }}
            severity="success"
            onClose={handleCloseAlert}
          >
            {alertMessage}
          </Alert>
        </Collapse>
        <Collapse in={openErrorAlert} style={{ width: "100%" }}>
          <Alert
            style={{ width: "40%", margin: "0 auto" }}
            severity="error"
            onClose={handleCloseErrorAlert}
          >
            {alertErrorMessage}
          </Alert>
        </Collapse>
      </Stack>


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
                    rows={furnitures} columns={columns} pageSize={3} checkboxSelection rowHeight={131} 
                    sx={{ "--DataGrid-overlayHeight": "100px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal" id="modal">
        <div className="close-button" 
            onClick={!isEdit ? toggleForm : handleModalEditClose}>
          <CloseIcon />
        </div>
        <form onSubmit={isEdit ? handleSubmitEdit : handleSubmit}>
          <div className="title-modal"> 
            {isEdit ? (
              <p>Edit Furniture Data of <span>{formData.furni_id}</span></p>
            ) : (
              <p>Furniture Data Form</p>
            )}
          </div>
          <div className="form-container">

            {/* LEFT SECTION */}
            <div className="left-container">

              {/* Data Form Submission Part 1 */}
              <div className="check-container">
                <div className="upper-part">
                  <TextField size="small" disabled={isEdit} label="Furniture ID" name="furni_id" error={!isFurniIdAvailable} value={formData.furni_id} onChange={handleChange} fullWidth required />
                  <Button color="violet" variant="contained" onClick={handleFurniIdCheck} disabled={!formData.furni_id || loading} style={{ marginLeft: "10px", width:"150px", display: !isEdit ?"block" : "none" }} >
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
                    <MenuItem value={"Bars"}>Bars</MenuItem>
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
                    <img style={{ borderRadius: "15px" }} src={imgAfterCrop? imgAfterCrop : formData.furni_picture.url} />
                    <input id="url-image-input" style={{visibility:"hidden"}} value={formData.furni_picture} onChange={handleChange} name="furni_pic" />
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
          {isEdit ? (
          <Button
            type="submit"
            variant="contained"
            color="violet"
            fullWidth
            onClick={ toggleForm }
          >
            Edit
          </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="violet"
              fullWidth
              onClick={isFurniIdAvailable ? toggleForm : null}
              disabled={!isFurniIdAvailable}
            >
              Submit
            </Button>
          )}
          </div>
        </form>
      </div>
    </ThemeProvider>
  );
};
export default FurniDataPage;
