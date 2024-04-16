import { useEffect, useState } from "react";
import "../styles/dashboard_page.scss";
import axios from "axios";

// SWIPER
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// CHART
import { PieChart } from "@mui/x-charts/PieChart";
const data = [
  { id: 0, value: 10, label: "series A" },
  { id: 1, value: 15, label: "series B" },
  { id: 2, value: 20, label: "series C" },
];

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Importing icons
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";

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
              <div className="icon">
                <DashboardRoundedIcon sx={{ fontSize: 30 }} />
              </div>
              <div className="menu">Dashboard</div>
            </div>
            <div className="dash-menu">
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
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: true,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <div className="card-stat">
                    <div className="stat-subtitle">Chart of Furniture Data based on</div>
                    <div className="stat-title">Style</div>
                    <PieChart
                      className="pieChart1"
                      series={[{
                          data,
                          highlightScope: {
                            faded: "global",highlighted: "item",
                          },
                          faded: {
                            innerRadius: 30, additionalRadius: -30, color: "gray",
                          },},]}
                      height={200}
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card-stat">Sub Space Stat</div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card-stat">Furniture Types</div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card-stat">Main Material</div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
