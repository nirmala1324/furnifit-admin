import React, { useState, useEffect } from "react";
import "../styles/login_page.scss";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ key }) => { // Pass a key to force re-render
  // State Variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  
  // Function to reset the form
  const resetForm = () => {
    setUsername("");
    setPassword("");
  };

  // HANDLE SUBMIT LOGIN
  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://furnifit-admin-backend.vercel.app/login", {
        username,
        password,
      });
    
      const { token, adminData } = response.data;
      localStorage.setItem("token", token);
    
      // Redirect to dashboard after successful login
      history('/');
    } catch (error) {
      console.error("Login failed:", error);
      // Reload the login page
      resetForm(); // Reset the form
      history('/login', { replace: true }); // Redirect to login page
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="header-container">
          <div className="logo"></div>
        </div>
        <div className="login-container">
          <div className="center-container">
            <form onSubmit={handleSubmitLogin} autoComplete="off">
              <div className="title">Admin Login</div>
              <div className="inputs">
                <TextField
                  size="small"
                  label="Username"
                  name="admin_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  size="small"
                  sx={{ mt: 2 }}
                  type="password"
                  label="Password"
                  name="admin_password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                />
              </div>
              <div className="button">
                <Button type="submit" variant="contained" color="secondary">
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="footer-container">Copyright © FurniFit 2024</div>
      </div>
    </>
  );
};

export default LoginPage;
