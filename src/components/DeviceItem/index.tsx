import { Collapse, Flex } from "antd";
import DeviceController from "../DeviceController";
import { DeviceProp } from "../../types/Device";
import { observer } from "mobx-react";

const DeviceItem = ({device}: DeviceProp) => {
  // console.log("DeviceItem:",device)
  return (
    <>
      <Flex gap="middle" justify="flex-start" align="center">
        <Collapse
          size="large"
          style={{ width: 1200 }}
          items={[
            { label: device.label, children: <DeviceController device={device} /> },
          ]}
        />
        {/* <Badge status={status ? "success" : "error"} /> */}
      </Flex>
    </>
  );
};

export default observer(DeviceItem);
