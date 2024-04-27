import { useEffect, useState } from "react";
import "../styles/dashboard_page.scss";
import axios from "axios";

// DATA GRID
import { DataGrid } from '@mui/x-data-grid';

// ROUTING
import { useNavigate, useLocation } from "react-router-dom";

// Importing icons
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import Charts from "../components/Charts";

const DashboardPage = () => {

  // Access location state
  const { state } = useLocation();
  const { adminData } = state || {}; // Destructure adminData, set default value to {} if state is undefined
  
  const navigate = useNavigate() // Goes to homepage

  // SET TOTAL COUNT DATA =======================================================
  const [totalData, setTotalData] = useState([]);

  useEffect( () => {
    const fetchTotalDataCount = async () => {
      try {
        const response = await axios.get('https://furnifit-admin-backend.vercel.app/dataToCharts');

        setTotalData(response.data.totalCount)

      } catch (error) {
        console.error('Error fetching total data:', error);
      }
    }

    fetchTotalDataCount();
  }, [])


  // SET DATA GRID =============================================================

  const [furnitures, setFurnitures] = useState([]);

  // Set Column
  const columns = [
    { field: 'furni_id', headerName: 'ID', width: 90 },
    { field: 'furni_name', headerName: 'Name', width: 150 },
    { field: 'space_cat', headerName: 'Space Category', width: 120 },
    { field: 'sub_space_cat', headerName: 'Sub Space Category', width: 150 },
    { field: 'furni_style', headerName: 'Style', width: 120 },
    { field: 'material_tag', headerName: 'Material Tag', width: 150 },
    { field: 'furni_dimension', headerName: 'Dimension', width: 150, 
      renderCell: (params) => (params.row.furni_dimension[0] + " x " + params.row.furni_dimension[1] + " x " + params.row.furni_dimension[2] + " mm") 
    },
    { field: 'furni_type', headerName: 'Type', width: 130 },
  ];

  // Get The Data
  useEffect(() => {
    axios.get('https://furnifit-admin-backend.vercel.app/getFurniData')
    .then(response => {
      // Add a unique 'id' property to each row
      const rowsWithId = response.data.map(row => ({ ...row, id: row.furni_id }));
      setFurnitures(rowsWithId);
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);

  // HTML
  return (
    <div className="outer-container">
      <div className="content-container">
        {/* {users.map((user, index) => {
          return (
            <div key={index}>
              <h3>{user.name}</h3>
              <h3>{user.age}</h3>
            </div>
          );
        })}
        <h3>Hello</h3> */}
        <div className="side-bar">
          <div className="logo"></div>
          <div className="menu-container">
            <div className="dash-menu selected-menu">
              <div className="icon">
                <DashboardRoundedIcon sx={{ fontSize: 30 }} />
              </div>
              <div className="menu">Dashboard</div>
            </div>
            <div className="dash-menu"  onClick={() => navigate('/furni-data')}>
              <div className="icon">
                <ListAltRoundedIcon sx={{ fontSize: 32 }} />
              </div>
              <div className="menu">Furniture Data</div>
            </div>
          </div>
        </div>
        <div className="separator"></div>
        <div className="main-part">
        {adminData && (
          <div className="top-content">
            <div className="welcome-text">Welcome back, {adminData.nickname} 🖖</div>
            <div className="account-container">
              <div className="profpic"></div>
              <div className="fullname">{adminData.nickname}</div>
            </div>
          </div>
        )}
          <div className="title-page">Dashboard</div>
          <div className="main-content">
            <div className="left-container">
              <div className="total-data">
                  <div className="big-text">Furniture Data in Total</div>
                  <div className="divider"></div>
                  <div className="total">{totalData}</div>
              </div>
              <div className="data-table">
                <div className="header">
                  <div className="title">Furnitures</div>
                  <div className="view-all" style={{cursor: "pointer"}} onClick={() => navigate('/furni-data')}>View all</div>
                </div>
                <div className="dataTable">
                <DataGrid
                  columns={columns}
                  rows={furnitures}
                  sx={{ '--DataGrid-overlayHeight': '300px' }}
                />
                </div>
              </div>
            </div>
            <Charts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
