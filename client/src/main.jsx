import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import {HelmetProvider} from 'react-helmet-async'
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <div onContextMenu={(e)=>e.preventDefault()}>
    <App />

    </div>
  </React.StrictMode>
);
