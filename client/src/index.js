// import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom";
import "./index.css";
import App from "./components/App";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
