import { Badge, Flex } from "antd";
import { DeviceProp } from "../../types/Device";
import { observer } from "mobx-react";

const DataShow = ({ device }: DeviceProp) => {
  const { label, status, code, group } = device;
  return (
    <Flex gap={20} justify="flex-start" align="center">
      <div>{label}</div>
      <div>设备码: {code}</div>
      <div>所在组: {group ?? "无"}</div>
      <div>状态: {status ? "运行" : "离线"}</div>
      <Badge status={status ? "success" : "error"} />
    </Flex>
  );
};

export default observer(DataShow);
