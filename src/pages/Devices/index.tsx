import { observer } from "mobx-react";
import DeviceItem from "../../components/DeviceItem";
import devicesStore from "../../store/devices";

const Devices = () => {
  const list = devicesStore.deviceList; 
  // console.log(list)
  return (<>
  {list.map(item=>{
    // console.log("Devices:",item)
    return <DeviceItem  device={item}/>
  })}
  </>);
};

export default observer(Devices);
