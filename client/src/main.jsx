import "../src/styles/index.scss";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App";


import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from "@mui/material/styles";


const violetBase = "#248b96";

const theme = createTheme({
  palette: {
    violet: {
      main: violetBase,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText:
        getContrastRatio(violetBase, "#fff") > 3 ? "#fff" : "#111",
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

