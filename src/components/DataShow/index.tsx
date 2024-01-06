import { Badge, Flex } from "antd";
import { DeviceProp } from "../../types/Device";
import { observer } from "mobx-react";
import KEYS from "../../types/SocketAPI";

const DataShow = ({ device }: DeviceProp) => {
  const {
    id,
    status,
    userdata_driver,
    userdata_area,
    lba_size,
    data_lba_size,
    data_number,
    sys_index,
  } = device;

  return (
    <Flex gap={20} justify="flex-start" align="center">
      <div>{id}</div>
      <div>驱动器: {userdata_driver}</div>
      <div>区域: {userdata_area}</div>
      <div>系统编号: {sys_index}</div>
      <div>总大小: {lba_size}</div>
      <div>数据大小: {data_lba_size}</div>
      <div>数据数量: {data_number}</div>
      <div>状态: {status}</div>
      <Badge status={status === KEYS.STATUS_ONLINE ? "success" : "error"} />
    </Flex>
  );
};

export default observer(DataShow);
