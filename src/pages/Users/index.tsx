import { Button, Flex, Input, Modal } from "antd";
import userStore from "../../store/users";
import UserItem from "../../components/UserItem";
import { useState } from "react";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    userStore.addUser({ username, password });
    setIsModalOpen(false);
    setUsername("");
    setPassword("");
    console.log("User:", userStore.users);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <Modal
        title="新增用户"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        keyboard={true}
      >
        <Input
          size="large"
          placeholder="输入用户名"
          prefix={<UserOutlined />}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <Input
          size="large"
          placeholder="输入密码"
          prefix={<LockOutlined />}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </Modal>
      <Flex gap={20}>
        <Button type="primary" onClick={showModal}>
          新增用户
        </Button>
      </Flex>
      {/* <UserItem user={{username:"admin",password:"123"}} index={1}/> */}
      {userStore.users.map((value, index) => (
        <UserItem key={index} user={value} index={index + 1} />
      ))}
    </>
  );
};

export default observer(Users);
