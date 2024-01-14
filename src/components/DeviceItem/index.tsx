import { Checkbox, Collapse, Flex } from "antd"
import DeviceController from "../DeviceController"
import { DeviceProp } from "../../types/Device"
import { observer } from "mobx-react"
import DataShow from "../DataShow"
import groupStore from "../../store/groups"

const DeviceItem = ({ device }: DeviceProp) => {
  // console.log("DeviceItem:",device.group)

  return (
    <>
      <Flex gap="middle" justify="flex-start" align="center">
        <Collapse
          size="large"
          style={{ width: 1200 }}
          items={[
            {
              label: <DataShow device={device} />,
              children: <DeviceController device={device} />,
            },
          ]}
        />
        <Checkbox
          onChange={(e) => {
            const checked = e.target.checked
            if (checked) {
              groupStore.addGroup("selected", device)
            } else {
              groupStore.deleteSelected(device)
            }
          }}
        />
      </Flex>
    </>
  )
}

export default observer(DeviceItem)
