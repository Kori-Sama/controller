import { Button, Flex } from "antd";
import userStore from "../../store/users";

const Users = () => {
  return (
    <>
      <Flex gap={20}>
        <Button type="primary">新增用户</Button>
        <Button type="primary">删除用户</Button>
        <Button type="primary">修改用户</Button>
      </Flex>
      {userStore.users.map((value,index)=>{

      })}
    </>
  );
};

export default Users;
