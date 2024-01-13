import { observer } from "mobx-react"
import { DeviceType } from "../../types/Device"
import DeviceItem from "../DeviceItem"
import { Button, Flex } from "antd"
import groupStore from "../../store/groups"
import KEYS from "../../types/SocketAPI"
import MoveButton from "./MoveButton"
import WipeButton from "./WipeButton"

const DeviceGroup = ({
  devices,
  groupName,
}: {
  devices: DeviceType[]
  groupName: string | null
}) => {
  const list = devices

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
            groupStore.sendMsgGroup(groupName, KEYS.ACTION_REBOOT, {})
          }
        >
          重启
        </Button>
        <Button
          type="primary"
          onClick={() =>
            groupStore.sendMsgGroup(groupName, KEYS.ACTION_SHUTDOWN, {})
          }
        >
          关机
        </Button>
        <MoveButton devices={devices} groupName={groupName} />
        <WipeButton groupName={groupName} />
      </Flex>
      {list.map((item, index) => (
        <DeviceItem key={index} device={item} />
      ))}
    </>
  )
}

export default observer(DeviceGroup)
