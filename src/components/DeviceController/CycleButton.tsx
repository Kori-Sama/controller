import { useState } from "react"
import { DeviceProp, DeviceType } from "../../types/Device"
import {
  Button,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Modal,
  Space,
  Tag,
} from "antd"
import { DownOutlined } from "@ant-design/icons"
import deviceStore from "../../store/devices"
import KEYS from "../../types/SocketAPI"

const CycleButton = ({ device }: DeviceProp) => {
  const [status, setStatus] = useState(device.automatic_status)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cycle, setCycle] = useState(0)
  const [leftScope, setLeftScope] = useState("")
  const [rightScope, setRightScope] = useState("")
  const showModal = () => {
    setIsModalOpen(true)
  }

  const submit = () => {
    let args: any = {}
    args[KEYS.KEY_AUTOMATIC_MOVE_PERIOD] = cycle
    args[KEYS.KEY_AUTOMATIC_MOVE_SCOPE] = [
      Number(leftScope),
      Number(rightScope),
    ]
    args[KEYS.KEY_AUTOMATIC_MOVE_STATUS] =
      status === "disabled" ? "enabled" : "disabled"

    deviceStore.sendMsg(device, KEYS.ACTION_AUTOMATIC_MOVE, args)
  }

  function handleOk() {
    submit()
    deviceStore.changeDeviceStatus(
      device,
      status === "disabled" ? "enabled" : "disabled"
    )
    if (status === "disabled") {
      setStatus("enabled")
    } else {
      setStatus("disabled")
    }
    // setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Modal
        title="设置周期"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={status === "enabled" ? "关闭" : "开启"}
      >
        <Input
          size="large"
          placeholder="周期"
          onChange={(e) => setCycle(Number(e.target.value))}
        />
        <Flex gap={20} style={{ marginTop: 20 }}>
          {" "}
          <ScopeButton
            device={device}
            callback={(value) => setLeftScope(value)}
          >
            从
          </ScopeButton>
          <Tag>{leftScope}</Tag>
          <ScopeButton
            device={device}
            callback={(value) => setRightScope(value)}
          >
            到
          </ScopeButton>
          <Tag>{rightScope}</Tag>
        </Flex>
      </Modal>
      <Button type="primary" onClick={() => showModal()}>
        设置周期
      </Button>
    </>
  )
}

export default CycleButton

const ScopeButton = ({
  device,
  callback,
  children,
}: {
  device: DeviceType
  callback: (value: string) => void
  children: string
}) => {
  const handleClick = (value: string) => {
    callback(value)
  }

  let items: MenuProps["items"] = []
  for (const key in device.system_list) {
    items.push({
      key,
      label: <div onClick={() => handleClick(key)}>{key}</div>,
    })
  }
  return (
    <>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {children}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </>
  )
}
