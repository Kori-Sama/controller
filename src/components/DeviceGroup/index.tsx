import { observer } from "mobx-react";
import { DeviceType } from "../../types/Device";
import DeviceItem from "../DeviceItem";
import { Button, Flex } from "antd";
import groupStore from "../../store/groups";
import { useNavigate } from "react-router-dom";
import KEYS from "../../types/SocketAPI";

const DeviceGroup = ({
  devices,
  groupName,
}: {
  devices: DeviceType[];
  groupName: string | null;
}) => {
  const navigate = useNavigate();
  const list = devices;

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
        <Button
          type="primary"
          onClick={() =>
            groupStore.sendMsgGroup(groupName!, KEYS.ACTION_REBOOT, {})
          }
        >
          重启
        </Button>
        <Button
          type="primary"
          onClick={() =>
            groupStore.sendMsgGroup(groupName!, KEYS.ACTION_SHUTDOWN, {})
          }
        >
          关机
        </Button>
      </Flex>
      {list.map((item, index) => (
        <DeviceItem key={index} device={item} />
      ))}
    </>
  );
};

export default observer(DeviceGroup);
