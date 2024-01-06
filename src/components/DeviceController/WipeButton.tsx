import { Button, Input, Modal } from "antd";
import deviceStore from "../../store/devices";
import { DeviceProp } from "../../types/Device";
import KEYS from "../../types/SocketAPI";
import { useState } from "react";

const WipeButton = ({ device }: DeviceProp) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startLBA, setStartLBA] = useState(0);
  const [endLBA, setEndLBA] = useState(0);
  const [driver, setDriver] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    let args: any = {};
    args[KEYS.ACTION_WIPE_STARTLBA] = startLBA;
    args[KEYS.ACTION_WIPE_ENDLBA] = endLBA;
    args[KEYS.ACTION_WIPE_DRIVER] = driver;

    deviceStore.sendMsg(device, KEYS.ACTION_WIPE, args);
    setIsModalOpen(false);
    setStartLBA(0);
    setEndLBA(0);
    setDriver("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStartLBA(0);
    setEndLBA(0);
    setDriver("");
  };
  return (
    <>
      <Modal
        title="清除数据"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        keyboard={true}
      >
        <Input
          size="large"
          placeholder="起始逻辑块地址"
          onChange={(e) => setStartLBA(Number(e.target.value))}
        />
        <Input
          size="large"
          placeholder="结束逻辑块地址"
          onChange={(e) => setEndLBA(Number(e.target.value))}
        />
        <Input
          size="large"
          placeholder="驱动器"
          onChange={(e) => setDriver(e.target.value)}
        />
      </Modal>
      <Button type="primary" onClick={() => showModal()}>
        清除数据
      </Button>
    </>
  );
};

export default WipeButton;
