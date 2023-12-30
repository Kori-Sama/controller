import { makeAutoObservable } from "mobx";
import { DeviceType } from "../types/Device";
import socket from "../socket";
import KEYS from "../types/SocketAPI";
import userStore from "./users";

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
    const index = this.deviceList.indexOf(device);
    if (index === -1) {
      return;
    }
    this.deviceList[index].group = group;
  }

  sendMsg(device: DeviceType, action: string, args: object) {
    let jsonObject: any = {};
    jsonObject[KEYS.DEVID] = device.label;
    jsonObject[KEYS.ACTION_NAME] = action;
    jsonObject[KEYS.ACTION_ARGS] = args;
    jsonObject[KEYS.USERNAME] = userStore.username;
    jsonObject[KEYS.PASSWORD] = "";

    console.log(`${device.label} send: ${action} with: `,jsonObject)

    socket.emit(KEYS.EVENT_CONTROLLER_ACTIONS, JSON.stringify(jsonObject));
  }
}

export default new DeviceStore();
