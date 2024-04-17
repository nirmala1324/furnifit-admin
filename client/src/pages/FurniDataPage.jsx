import { useEffect, useState } from "react";
import "../styles/furni_data_page.scss";
import axios from "axios";

// ROUTING
import { useNavigate } from "react-router-dom";

// DATA GRID
import { DataGrid } from '@mui/x-data-grid';

// Importing icons and components
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


const FurniDataPage = () => {
  const navigate = useNavigate() // Goes to homepage

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
            <div className="dash-menu" onClick={() => navigate('/')} >
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
                <Button variant="contained"><AddIcon/> Add New Data</Button>
              </div>
              <div className="dataTable">
              <DataGrid
                  columns={[{ field: 'ID' }, { field: 'First name' }, { field: 'Last name' }]}
                  rows={[]}
                  sx={{ '--DataGrid-overlayHeight': '300px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurniDataPage;
