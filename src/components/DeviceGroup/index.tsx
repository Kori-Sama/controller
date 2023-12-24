import { observer } from "mobx-react";
import { DeviceType } from "../../types/Device";
import DeviceItem from "../DeviceItem";
import { Button, Flex } from "antd";
import groupStore from "../../store/groups";
import { useNavigate } from "react-router-dom";

interface DevicesProp {
  devices: DeviceType[];
}

const DeviceGroup = ({ devices }: DevicesProp) => {
  const navigate = useNavigate();
  const list = devices;
  let groupName: string | null;
  if (devices.length !== 0) {
    groupName = devices[0].group;
  }

  const handleDelete = () => {
    groupStore.deleteGroup(groupName);
    navigate("/devices");
  };

  return (
    <>
      <Flex
        style={{ margin: 12 }}
        justify="flex-start"
        align="center"
        gap="middle"
      >
        <Button type="primary" onClick={() => handleDelete()}>
          删除该组
        </Button>
        <Button type="primary">操作2</Button>
        <Button type="primary">操作3</Button>
      </Flex>
      {list.map((item) => (
        <DeviceItem device={item} />
      ))}
    </>
  );
};

export default observer(DeviceGroup);