import { observer } from "mobx-react"
import DeviceItem from "../../components/DeviceItem"
import devicesStore from "../../store/devices"
import { Button, Flex } from "antd"
import groupStore from "../../store/groups"
import KEYS from "../../types/SocketAPI"

const Devices = () => {
  const list = devicesStore.deviceList

  // console.log(list.map(item=>item.group))
  return (
    <>
      <Flex
        style={{ margin: 12 }}
        justify="flex-start"
        align="center"
        gap="middle"
      >
        <Button
          type="primary"
          onClick={() =>
            groupStore.sendMsgGroup("selected", KEYS.ACTION_REBOOT, {})
          }
        >
          重启
        </Button>
        <Button
          type="primary"
          onClick={() =>
            groupStore.sendMsgGroup("selected", KEYS.ACTION_SHUTDOWN, {})
          }
        >
          关机
        </Button>
      </Flex>
      {list.map((item, index) => {
        // console.log("Devices:",item)
        return <DeviceItem key={index} device={item} />
      })}
    </>
  )
}

export default observer(Devices)
