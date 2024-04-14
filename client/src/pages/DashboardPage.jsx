import { useEffect, useState } from "react";
import "../styles/dashboard_page.scss";
import axios from "axios";

// Importing icons
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';

const DashboardPage = () => {
  // VARIABLES
  // const [users, setUsers] = useState([]);

  // Calling API GET data from Database
  // const getUsers = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3001/getUsers");
  //     return response.data;
  //   } catch (error) {
  //     console.log("Error fetching users: ", error);
  //   }
  // };

  // useEffect(() => {
  //   getUsers().then((users) => {
  //     console.log(users);
  //     setUsers(users);
  //   }).catch((err) => console.error("Error in getUsers: ", err))
  // }, [])

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
              <div className="icon"><DashboardRoundedIcon sx={{ fontSize:30 }}/></div>
              <div className="menu">Dashboard</div>
            </div>
            <div className="dash-menu">
              <div className="icon"><ListAltRoundedIcon sx={{ fontSize:32 }}/></div>
              <div className="menu">Furniture Data</div>
            </div>
          </div>
        </div>
        <div className="separator"></div>
        <div className="main-part">
          <div className="top-content">
            <div className="welcome-text">Welcome back, Andrea 🖖</div>
            <div className="account-container">
              <div className="profpic"></div>
              <div className="fullname">Adrea Hirata</div>
            </div>
          </div>
          <div className="title-page">Dashboard</div>
          <div className="main-content">
            <div className="left-container">
              <div className="total-data"></div>
              <div className="data-table"></div>
            </div>
            <div className="right-container">
              <div className="stat stat-style"></div>
              <div className="stat stat-sub-space"></div>
              <div className="stat stat-furni-type"></div>
              <div className="stat main-material"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
