import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FurniDataPage from "./pages/FurniDataPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/furni-data" element={<FurniDataPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
