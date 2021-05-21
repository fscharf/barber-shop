import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/style.min.css";
import "bootstrap/dist/js/bootstrap";
import Routes from "./routes";

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);
