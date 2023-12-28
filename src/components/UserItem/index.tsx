import { Button, Collapse, Flex, Input, Modal } from "antd";
import { UserType } from "../../types/User";
import { observer } from "mobx-react";
import userStore from "../../store/users";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

const UserItem = ({ user, index }: { user: UserType; index: number }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    userStore.modifyUser(user,{ username, password });
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
      {" "}
      <Modal
        title="修改用户"
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
      <Collapse
        size="large"
        items={[
          {
            key: "1",
            label: `${index}. 用户名: ${user.username} 密码: ${user.password}`,
            children: (
              <Flex gap={40}>
                <Button
                  type="primary"
                  onClick={() => userStore.deleteUser(user)}
                >
                  删除用户
                </Button>
                <Button type="primary" onClick={showModal}>修改用户</Button>
              </Flex>
            ),
          },
        ]}
      ></Collapse>
    </>
  );
};

export default observer(UserItem);
