import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import devicesStore from "./store/devices";
import { list } from "./mock/data";
// import groupsStore from "./store/groups";
import App from "./App";

devicesStore.setDeviceList(list);
// groupsStore.addToGroup(1, list[0]);
// groupsStore.addToGroup(2, list[0]);
// console.log(groupsStore.groups.get(1)?.at(0));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
