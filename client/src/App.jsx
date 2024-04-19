import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FurniDataPage from "./pages/FurniDataPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import TrialCropper from "../src/pages/TrialCropper";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/furni-data" element={<FurniDataPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<ErrorPage />} />
          
          <Route path="/crop" element={<TrialCropper />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
