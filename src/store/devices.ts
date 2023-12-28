import { makeAutoObservable } from "mobx";
import { DeviceType } from "../types/Device";

export class DeviceStore {
  deviceList: DeviceType[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  setDeviceList(devices: DeviceType[]) {
    this.deviceList = devices;
  }

  addToDeviceList(device: DeviceType) {
    this.deviceList.push(device);
  }

  changeGroup(device: DeviceType, group: string | null) {
    // console.log(this.deviceList[1],"|",device)
    // console.log(device)
    const index = this.deviceList.indexOf(device);
    // console.log(index)
    if (index === -1) {
      return;
    }
    this.deviceList[index].group = group;
  }

  sendMsg(device:DeviceType,event:string,msg:string) {
    console.log(`Device ${device.label} send ${event}: ${msg}`)
  }
}

export default new DeviceStore();
