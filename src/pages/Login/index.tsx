import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from '@ant-design/pro-components';
import { Tabs, theme } from 'antd';


export default () => {
  const { token } = theme.useToken();

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          title="用户登录"
          subTitle="输入用户名和密码进行登录"
        >
          <Tabs
            centered
          >
          </Tabs>
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder='用户名'
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                  strengthText:
                    'Password should contain numbers, letters and special characters, at least 8 characters long.',
                }}
                placeholder='密码'
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
                
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <a href='/register'>没有账号?点击前往注册</a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};