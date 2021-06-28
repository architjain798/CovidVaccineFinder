import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./Componets/App";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <div class="container-fluid p-3 mb-3 bg-primary text-white table-responsive">
    <App />
  </div>,
  rootElement
);
