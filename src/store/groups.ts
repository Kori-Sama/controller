import { action, makeAutoObservable } from "mobx";
import { DeviceType } from "../types/Device";
import deviceStore from "./devices";

export class GroupStore {
  groups: Map<string, DeviceType[]>;
  constructor() {
    makeAutoObservable(this);
    this.groups = this.loadOnLocal();
  }

  addToGroup(group: string, device: DeviceType) {
    // console.log(device.group)
    // console.log(device.group)
    if (device.group !== null) {
      // console.log("start");
      // console.log(device.group)
      const index = this.groups.get(device.group)?.indexOf(device);
      this.groups.get(device.group)?.splice(index!);
      // console.log(this.groups.get(device.group));
      // console.log("end");
    }

    deviceStore.changeGroup(device, group);

    if (this.groups.has(group)) {
      this.groups.get(group)?.push(device);
    } else {
      let devices: DeviceType[] = [device];
      this.groups.set(group, devices);
    }
    // console.log("store:",device)
    this.saveOnLocal();
  }

  @action
  deleteGroup(group: string | null) {
    if (group === null) {
      return;
    }
    this.groups
      .get(group)
      ?.forEach((item) => deviceStore.changeGroup(item, null));
    this.groups.delete(group);
    this.saveOnLocal();
  }
  @action
  deleteDevice(device: DeviceType) {
    const index = this.groups.get(device.group!)?.indexOf(device);
    this.groups.get(device.group!)?.splice(index!);
    deviceStore.changeGroup(device, null);
    this.saveOnLocal();
  }

  sendMsgGroup(group: string, event: string, msg: string) {
    if (this.groups.has(group)) {
      this.groups.get(group)?.forEach((item) => {
        deviceStore.sendMsg(item, event, msg);
      });
    }
  }

  saveOnLocal() {
    const data = Object.fromEntries(this.groups.entries());
    window.localStorage.removeItem("groupInfo");
    // console.log(data)
    window.localStorage.setItem("groupInfo", JSON.stringify(data));
  }

  loadOnLocal() {
    const json = window.localStorage.getItem("groupInfo");
    if (json === null) {
      return new Map<string, DeviceType[]>();
    }
    const obj = JSON.parse(json);
    // console.log(obj)
    return new Map<string, DeviceType[]>(Object.entries(obj));
  }
  @action
  clearGroup() {
    this.groups.clear();
    window.localStorage.removeItem("groupInfo");
  }
}

export default new GroupStore();
