import { observer } from "mobx-react";
import DeviceItem from "../../components/DeviceItem";
import devicesStore from "../../store/devices";

const Devices = () => {
  const list = devicesStore.deviceList; 

  // console.log(list.map(item=>item.group))
  return (<>
  {list.map((item,index)=>{
    // console.log("Devices:",item)
    return <DeviceItem key={index} device={item}/>
  })}
  </>);
};

export default observer(Devices);
