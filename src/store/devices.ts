import { makeAutoObservable } from "mobx"
import { DeviceType } from "../types/Device"
import socket from "../socket"
import KEYS from "../types/SocketAPI"
import userStore from "./users"
import groupStore from "./groups"

export class DeviceStore {
  deviceList: DeviceType[] = []
  constructor() {
    makeAutoObservable(this)
  }

  setDeviceList(devices: DeviceType[]) {
    this.deviceList = devices
    groupStore.initGroups(devices)
  }

  addToDeviceList(device: DeviceType) {
    // console.log(device.belong_groups)
    this.deviceList.push(device)
    if (device.belong_groups === undefined || device.belong_groups === null) {
      groupStore.addGroup("admin", device)
    } else {
      device.belong_groups.forEach((group) => {
        groupStore.addGroup(group, device)
      })
    }
  }

  // changeGroup(device: DeviceType, group: string | null) {
  //   const index = this.deviceList.indexOf(device);
  //   if (index === -1) {
  //     return;
  //   }
  //   this.deviceList[index].group = group;
  // }

  sendMsg(device: DeviceType, action: string, args: object) {
    let jsonObject: any = {}
    jsonObject[KEYS.DEVID] = device.id
    jsonObject[KEYS.ACTION_NAME] = action
    jsonObject[KEYS.ACTION_ARGS] = args
    jsonObject[KEYS.USERNAME] = userStore.username
    jsonObject[KEYS.PASSWORD] = ""

    console.log(`${device.id} send: ${action} with: `, jsonObject)

    socket.emit(KEYS.EVENT_CONTROLLER_ACTIONS, JSON.stringify(jsonObject))
  }

  handleEVENT_UPDATE_CONTROLLER_DATA(original_s: any): void {
    console.log("Device : " + original_s)

    // Parse the JSON string
    const jsonObject = JSON.parse(original_s)

    // Extract client information from the JSON object
    const id: string = jsonObject[KEYS.DEVID]
    const status: string = jsonObject[KEYS.STATUS]
    const userdata_driver: string = jsonObject[KEYS.USERDATA_DRIVER]
    const userdata_area: string = JSON.stringify(jsonObject[KEYS.USERDATA_AREA])
    const lba_size: string = String(jsonObject[KEYS.LBA_SIZE])
    const data_lba_size: string = String(jsonObject[KEYS.DATA_LBA_SIZE])
    const data_number: number = jsonObject[KEYS.DATA_NUMBER]
    const sys_index: number = jsonObject[KEYS.SYS_INDEX]
    const system_list: { [key: string]: number[] } =
      jsonObject[KEYS.SYSTEM_LIST]

    const belong_groups: string[] = jsonObject[KEYS.BELONG_GROUPS]

    const device: DeviceType = {
      id,
      status,
      userdata_driver,
      userdata_area,
      lba_size,
      data_lba_size,
      data_number,
      sys_index,
      system_list,
      belong_groups,
    }
    const index = this.deviceList.findIndex((item) => item.id === id)
    if (index === -1) {
      this.addToDeviceList(device)
    } else {
      this.deviceList[index] = device
    }
  }
}

export default new DeviceStore()
