import { useState } from "react"
import { DeviceProp, DeviceType } from "../../types/Device"
import { Dropdown, Flex, Input, MenuProps, Modal, Radio, Space } from "antd"
import { DownOutlined } from "@ant-design/icons"
import deviceStore from "../../store/devices"
import KEYS from "../../types/SocketAPI"

const CycleButton = ({ device }: DeviceProp) => {
  const [isCycleEnabled, setIsCycleEnabled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cycle, setCycle] = useState(0)
  const [leftScope, setLeftScope] = useState("")
  const [rightScope, setRightScope] = useState("")
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    let args: any = {}
    args[KEYS.KEY_AUTOMATIC_MOVE_PERIOD] = cycle
    args[KEYS.KEY_AUTOMATIC_MOVE_SCOPE] = JSON.stringify([
      leftScope,
      rightScope,
    ])
    args[KEYS.KEY_AUTOMATIC_MOVE_STATUS] = isCycleEnabled
      ? "enabled"
      : "disabled"

    deviceStore.sendMsg(device, KEYS.ACTION_AUTOMATIC_MOVE, args)
    setIsModalOpen(false)
    setCycle(0)
    setLeftScope("")
    setRightScope("")
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setCycle(0)
    setLeftScope("")
    setRightScope("")
  }

  return (
    <>
      <Modal
        title="设置周期"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        keyboard={true}
      >
        <Input
          size="large"
          placeholder="周期"
          onChange={(e) => setCycle(Number(e.target.value))}
        />
        <Flex>
          {" "}
          <ScopeButton
            device={device}
            callback={(value) => setLeftScope(value)}
          >
            from
          </ScopeButton>
          <ScopeButton
            device={device}
            callback={(value) => setRightScope(value)}
          >
            to
          </ScopeButton>
        </Flex>
      </Modal>
      <Radio.Group>
        <Radio.Button
          type={isCycleEnabled ? "primary" : "default"}
          onClick={() => {
            setIsCycleEnabled(!isCycleEnabled)
            deviceStore.changeDeviceStatus(
              device,
              isCycleEnabled ? "enabled" : "disabled"
            )
          }}
        >
          {isCycleEnabled ? "关闭周期" : "开启周期"}
        </Radio.Button>
        <Radio.Button type="primary" onClick={() => showModal()}>
          设置周期
        </Radio.Button>
      </Radio.Group>
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
