import { action, makeAutoObservable } from "mobx";
import { DeviceType } from "../types/Device";
import deviceStore from "./devices";

export class GroupStore {
  groups = new Map<string, DeviceType[]>();
  constructor() {
    makeAutoObservable(this);
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
  }

  @action
  deleteGroup(group: string | null) {
    if (group === null) {
      return;
    }
    this.groups.delete(group);
  }
  @action
  deleteDevice(device: DeviceType) {
    const index = this.groups.get(device.group!)?.indexOf(device);
    this.groups.get(device.group!)?.splice(index!);
    deviceStore.changeGroup(device,null)
  }
}

export default new GroupStore();
