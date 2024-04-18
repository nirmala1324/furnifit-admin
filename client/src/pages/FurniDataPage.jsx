import { useEffect, useState } from "react";
import "../styles/furni_data_page.scss";
import axios from "axios";

import { TextField, Typography } from "@mui/material";

import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from "@mui/material/styles";

// ROUTING
import { useNavigate } from "react-router-dom";

// DATA GRID
import { DataGrid } from "@mui/x-data-grid";

// Importing icons and components
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  CircularProgress,
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

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

const FurniDataPage = () => {
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
    furni_dimension: [],
    furni_picture: { public_id: "", url: "" },
    furni_type: "",
    furni_style: "",
    material_tag: [],
    vectary_link: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsFurniIdAvailable(true); // Reset availability check when the ID changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isFurniIdAvailable) {
    try { 
      await axios.post("/submit-form", formData);
      alert("Furniture data saved successfully");
      // Clear form data after successful submission if needed
      setFormData({
        furni_id: "",
        furni_name: "",
        space_cat: "",
        sub_space_cat: "",
        detail_material: "",
        furni_desc: "",
        furni_dimension: [],
        furni_picture: { public_id: "", url: "" },
        furni_type: "",
        furni_style: "",
        material_tag: [],
        vectary_link: "",
      });
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
      const response = await axios.get(`http://localhost:3001/checkFurnitureID/${formData.furni_id}`);
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
        <div className="close-button"></div>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5">Furniture Data Form</Typography>
          <div className="form-container">
            <div className="left-container">
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
                    <p id="div-message" style={{ color: "red" }}>
                      
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="right-container"></div>
          </div>
          {/* <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            fullWidth
            required
          /> */}
          <div className="button-submit">
          <Button
            onClick={toggleForm}
            type="submit"
            variant="contained"
            color="primary"
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
