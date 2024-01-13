import { Dropdown, MenuProps, Space } from "antd"
import { DownOutlined } from "@ant-design/icons"
import KEYS from "../../types/SocketAPI"
import groupStore from "../../store/groups"
import { DeviceType } from "../../types/Device"

const MoveButton = ({
  devices,
  groupName,
}: {
  devices: DeviceType[]
  groupName: string | null
}) => {
  const handleClick = (value: number[]) => {
    const startLBA = value[0]
    const endLBA = value[1]
    let args: any = {}
    args[KEYS.ACTION_MOVE_STARTLBA] = startLBA
    args[KEYS.ACTION_MOVE_ENDLBA] = endLBA
    groupStore.sendMsgGroup(groupName, KEYS.ACTION_MOVE, args)
  }

  let items: MenuProps["items"] = []
  for (const key in devices[0].system_list) {
    items.push({
      key,
      label: (
        <div onClick={() => handleClick(devices[0].system_list[key])}>
          {key}
        </div>
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
