import { FC } from "react";
import { BrowserRouter  } from "react-router-dom";
import Router from "./router";
// import data from "./mock/data.json"
// import deviceStore from "./store/devices";
// import { DeviceType } from "./types/Device";

// deviceStore.addToDeviceList(data.at(0) as DeviceType)

const App: FC = () => {

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
