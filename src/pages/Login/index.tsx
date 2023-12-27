import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import { Tabs, theme } from "antd";
import userStore from "../../store/users";
import { UserType } from "../../types/User";
import { useNavigate } from "react-router-dom";

export default () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const handleFinish = async (data: any) => {
    const user = data as UserType;
    const res = await userStore.reqLogin(user);
    if (res === null) {
      navigate("/devices");
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "35%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ProConfigProvider hashed={false}>
        <div style={{ backgroundColor: token.colorBgContainer }}>
          <LoginForm title="用户登录" onFinish={handleFinish}>
            <Tabs centered></Tabs>
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined className={"prefixIcon"} />,
                }}
                placeholder="用户名"
                rules={[
                  {
                    required: true,
                    message: "请输入用户名!",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined className={"prefixIcon"} />,
                  strengthText:
                    "Password should contain numbers, letters and special characters, at least 8 characters long.",
                }}
                placeholder="密码"
                rules={[
                  {
                    required: true,
                    message: "请输入密码！",
                  },
                ]}
              />
            </>

            <div
              style={{
                marginBlockEnd: 24,
              }}
            ></div>
          </LoginForm>
        </div>
      </ProConfigProvider>
    </div>
  );
};
