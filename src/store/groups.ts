import { makeAutoObservable } from "mobx"
import { DeviceType } from "../types/Device"
import deviceStore from "./devices"

export class GroupStore {
  groups: Map<string, DeviceType[]> = new Map()

  constructor() {
    makeAutoObservable(this)
  }

  initGroups(devices: DeviceType[] = deviceStore.deviceList) {
    devices.forEach((device) => {
      device.belong_groups.forEach((group) => {
        this.addGroup(group, device)
      })
    })
  }

  addGroup(group: string, device: DeviceType) {
    if (!this.groups.has(group)) {
      this.groups.set(group, [])
    }
    this.groups.get(group)?.push(device)
  }
  deleteSelected(devcie: DeviceType) {
    if (devcie.belong_groups.at(0) !== "selected") return
    devcie.belong_groups.pop()
  }

  sendMsgGroup(group: string | null, action: string, args: {}) {
    if (group === null) return
    if (this.groups.has(group)) {
      this.groups.get(group)?.forEach((item) => {
        deviceStore.sendMsg(item, action, args)
      })
    }
  }
}

export default new GroupStore()
