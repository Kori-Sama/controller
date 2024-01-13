import { Button, Flex } from "antd"
import { DeviceProp } from "../../types/Device"
import deviceStore from "../../store/devices"
import { observer } from "mobx-react"
import KEYS from "../../types/SocketAPI"
import WipeButton from "./WipeButton"
import MoveButton from "./MoveButton"
import CycleButton from "./CycleButton"

const DeviceController = ({ device }: DeviceProp) => {
  
  return (
    <>
      <Flex justify="space-around" align="center" gap={10}>
        <Button
          type="primary"
          onClick={() => deviceStore.sendMsg(device, KEYS.ACTION_REBOOT, {})}
        >
          重启
        </Button>
        <Button
          type="primary"
          onClick={() => deviceStore.sendMsg(device, KEYS.ACTION_SHUTDOWN, {})}
        >
          关机
        </Button>
        <WipeButton device={device} />
        <MoveButton device={device} />
        
        <CycleButton device={device} />
      </Flex>
    </>
  )
}

export default observer(DeviceController)
