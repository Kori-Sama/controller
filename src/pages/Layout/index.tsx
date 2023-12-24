import React, { useState } from "react";
import { AndroidOutlined, AppstoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import groupsStore from "../../store/groups";
import { autorun, observable } from "mobx";
import { observer } from "mobx-react";
const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const getGroups = (): MenuItem[] => {
  return Array.from(groupsStore.groups).map((value, _) =>
    getItem("群组" + value[0], "/groups/" + value[0])
  );
};

const App: React.FC = observer(() => {
  // const [groupsChildren, setGroupsChildren] = useState(getGroups());

  let items = observable([
    getItem("设备", "/devices", <AndroidOutlined />),
    getItem("群组", "/groups", <AppstoreOutlined />, getGroups()),
  ]);

  // const [items, setItems] = useState([
  //   getItem("设备", "/devices", <AndroidOutlined />),
  //   getItem("群组", "/groups", <AppstoreOutlined />, getGroups()),
  // ]);

  autorun(() => {
    items.replace([
      getItem("设备", "/devices", <AndroidOutlined />),
      getItem("群组", "/groups", <AppstoreOutlined />, getGroups()),
    ]);
  });

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["/devices"]}
          mode="inline"
          items={items}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} />
          <div
            style={{
              padding: 24,
              minHeight: "auto",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
});

export default App;
