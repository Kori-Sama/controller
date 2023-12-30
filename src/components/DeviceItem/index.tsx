import { Collapse, Flex } from "antd";
import DeviceController from "../DeviceController";
import { DeviceProp } from "../../types/Device";
import { observer } from "mobx-react";
import DataShow from "../DataShow";

const DeviceItem = ({device}: DeviceProp) => {
  // console.log("DeviceItem:",device.group)

  return (
    <>
      <Flex gap="middle" justify="flex-start" align="center">
        <Collapse
          size="large"
          style={{ width: 1200 }}
          items={[
            { label:<DataShow device={device}/>, children: <DeviceController device={device} /> },
          ]}
        />
        {/* <Badge status={status ? "success" : "error"} /> */}
      </Flex>
    </>
  );
};

export default observer(DeviceItem);
