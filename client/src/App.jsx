import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import FurniDataPage from "./pages/FurniDataPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log('Stored Token:', storedToken);
    setToken(storedToken);
    setLoading(false); // Set loading to false once token is retrieved
  }, []);

  // Function to force reload the login page
  const reloadLoginPage = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    window.location.reload(); // Reload the page
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage/>}
        />
        <Route
          path="/"
          element={<DashboardPage />}
        />
        <Route
          path="/furni-data"
          element={<FurniDataPage/>}
        />
        <Route
          path="/*"
          element={<ErrorPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
