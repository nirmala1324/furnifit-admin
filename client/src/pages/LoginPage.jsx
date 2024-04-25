import React, { useState } from 'react';
import "../styles/login_page.scss";
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  // State Variables
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const history = useNavigate();

  // HANDLE SUBMIT LOGIN 
  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        username, password
      });

      const {token} = response.data;
      localStorage.setItem('token', token)

      // Redirect to dashboard after successful login
      history.push('/')
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <>
    <div className="main-container">
      <div className="header-container">
        <div className="logo"></div>
      </div>
      <div className="login-container">
        <div className="center-container">
          <form onSubmit={handleSubmitLogin}>
            <div className="title">Admin Login</div>
            <div className="inputs">
              <TextField size="small" label="Username" name="admin_username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth required />
              <TextField size="small" sx={{mt: 2}} type='password' label="Password" name="admin_password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
            </div>
            <div className="button">
              <Button variant="contained" color='secondary'>Login</Button>
            </div>
          </form>
        </div>
      </div>
      <div className="footer-container">Copyright © FurniFit 2024</div>
    </div>
    </>
  )
}

export default LoginPage