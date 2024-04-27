import { useNavigate } from "react-router-dom";
import "../styles/error_page.scss";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ErrorPage = () => {

  const navigate = useNavigate();

  return (
    <div className="outer-container">
      <div className="bg-container">
        <div className="logo-container">
          <div className="logo-div"></div>
        </div>
        <div className="error-text-container">
          <div className="title">OOPS!</div>
          <div className="subtitle">Something's missing.</div>
          <div className="text">
            This page is missing or you <br/>
            assembled the link incorrectly.
          </div>
          <div className="back-container" onClick={() => navigate("/")}>
            <ArrowBackIcon />
            GO BACK
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage