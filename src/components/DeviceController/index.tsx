import { Button, Flex, Input, Modal, message } from "antd";
import { DeviceProp } from "../../types/Device";
import groupsStore from "../../store/groups";
import { AppstoreOutlined } from "@ant-design/icons";
import { useState } from "react";
import DataShow from "../DataShow";

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
      messageApi.error("该设备不在组中")
      return;
    }
    groupsStore.deleteDevice(device);
  };

  return (
    <>
      {contextHolder}
      <DataShow device={device} />
      <Modal
        title="加入组"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          size="large"
          placeholder="输入想加入的组名"
          prefix={<AppstoreOutlined />}
          onChange={(e) => setGroupName(e.target.value)}
          value={groupName}
        />
      </Modal>
      <Flex justify="space-around" align="center" gap="middle">
        <Button type="primary" onClick={() => showModal()}>
          加入组
        </Button>
        <Button type="primary" onClick={() => handleDelete()}>
          从本组删去
        </Button>
      </Flex>
    </>
  );
};

export default DeviceController;
