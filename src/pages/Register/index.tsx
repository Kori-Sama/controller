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
          title="用户注册"
          subTitle="输入用户名和密码进行注册"
          submitter={{searchConfig:{submitText:"注册"}}}
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
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                  strengthText:
                    'Password should contain numbers, letters and special characters, at least 8 characters long.',
                }}
                placeholder='再次输入密码'
                rules={[
                  {
                    required: true,
                    message: '请再次输入密码！',
                  },
                ]}
              />
            </>
 
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <a href='/login'>已有账号?点击前往登录</a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};