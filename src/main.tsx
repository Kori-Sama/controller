import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import devicesStore from "./store/devices";
import App from "./App";

import data from "./mock/data.json";
devicesStore.setDeviceList(data);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
