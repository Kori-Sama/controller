import {
  Button,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Modal,
  Space,
  message,
} from "antd";
import { DeviceProp } from "../../types/Device";
import groupsStore from "../../store/groups";
import {
  AppstoreOutlined,
  DownOutlined,
  AppstoreAddOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import deviceStore from "../../store/devices";
import { observer } from "mobx-react";
import { observable } from "mobx";
import KEYS from "../../types/SocketAPI";

const DeviceController = ({ device }: DeviceProp) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // console.log("controller:",device)
    groupsStore.addToGroup(groupName, device);
    setIsModalOpen(false);
    setGroupName("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setGroupName("");
  };

  const handleDelete = () => {
    if (device.group === null) {
      messageApi.error("该设备不在组中");
      return;
    }
    groupsStore.deleteDevice(device);
  };

  let items: MenuProps["items"] = observable(
    Array.from(groupsStore.groups).map((value, index) => {
      return {
        key: index.toString(),
        label: (
          <div onClick={() => groupsStore.addToGroup(value[0], device)}>
            {value[0]}
          </div>
        ),
      };
    })
  );

  items.push({
    key: "new",
    label: <div onClick={() => showModal()}>创建组</div>,
  });

  return (
    <>
      {contextHolder}
      <Modal
        title="创建组"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        keyboard={true}
      >
        <Input
          size="large"
          placeholder="输入想创建的组名"
          prefix={<AppstoreOutlined />}
          onChange={(e) => setGroupName(e.target.value)}
          value={groupName}
        />
      </Modal>
      <Flex justify="space-around" align="center" gap={10}>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <AppstoreAddOutlined />
              加入
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <Button type="primary" onClick={() => handleDelete()}>
          <DeleteOutlined />
          组中删去
        </Button>
        <Button
          type="primary"
          onClick={() => deviceStore.sendMsg(device, KEYS.ACTION_REBOOT, {})}
        >
          重启
        </Button>
        <Button
          type="primary"
          onClick={() => deviceStore.sendMsg(device, KEYS.ACTION_SHUTDOWN, {})}
        >
          关机
        </Button>
      </Flex>
    </>
  );
};

export default observer(DeviceController);
