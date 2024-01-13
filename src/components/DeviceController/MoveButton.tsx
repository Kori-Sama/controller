import { Dropdown, MenuProps, Space } from "antd"
import { DeviceProp } from "../../types/Device"
import { DownOutlined } from "@ant-design/icons"
import deviceStore from "../../store/devices"
import KEYS from "../../types/SocketAPI"

const MoveButton = ({ device }: DeviceProp) => {
  const handleClick = (value: number[]) => {
    const startLBA = value[0]
    const endLBA = value[1]
    let args: any = {}
    args[KEYS.ACTION_MOVE_STARTLBA] = startLBA
    args[KEYS.ACTION_MOVE_ENDLBA] = endLBA
    deviceStore.sendMsg(device, KEYS.ACTION_MOVE, args)
  }

  let items: MenuProps["items"] = []
  for (const key in device.system_list) {
    items.push({
      key,
      label: (
        <div onClick={() => handleClick(device.system_list[key])}>{key}</div>
      ),
    })
  }
  return (
    <>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            移动
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </>
  )
}

export default MoveButton
