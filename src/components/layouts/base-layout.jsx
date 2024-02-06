import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import {useState} from "react";
import {filteredRoutes} from "@/modules/routes.js";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {Layout, Menu, Button, theme, Dropdown, Avatar} from "antd";

import icon from '../../assets/icons/icon.svg';
import {useDispatch} from "react-redux";
import {logOut} from "@/store/auth-slice/index.js";

const {Header, Sider, Content} = Layout;

export const BaseLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login")
  }

  const items = [
    {
      label: "My Profile",
      key: "0",
    },
    {
      type: "divider",
      key: "1"
    },
    {
      label: <p onClick={handleLogout} className="text-red-600 w-full h-full">Log Out</p>,
      key: "2",
    },
  ];

  return (
    <Layout
      className={`h-screen pt-[70px] relative duration-300 ${
        collapsed ? "pl-[80px]" : "pl-[200px]"
      }`}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="base_layout_aside fixed top-0 z-[9999] left-0 h-screen"
      >
        <div className={`text-white flex items-center justify-center py-3`}>
          <p
            className={`duration-150 flex font-semibold ${
              collapsed ? "text-[0px]" : "text-3xl"
            }`}
          >
            Texn
            <img
              className={`${collapsed ? "w-11 rotate-0 scale-x-100" : "w-9 -mr-2 -scale-x-100 -rotate-12"} transition-all duration-300`}
              src={icon}
              alt="icon"/>
            life
          </p>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/lead"]}
          items={filteredRoutes
            .filter(({visible}) => visible)
            .map(({path, icon: IconComponent, label}) => ({
              key: path,
              icon: IconComponent ? <IconComponent/> : null,
              label: (
                <Link to={path} key={path}>
                  {label}
                </Link>
              ),
            }))}
        />
      </Sider>
      <Layout>
        <Header
          className={`shadow-md flex items-center justify-between duration-200 px-4 fixed top-0 right-0 z-[999] ${
            !collapsed ? "w-[calc(100%-200px)]" : "w-[calc(100%-80px)]"
          }`}
          style={{
            background: colorBgContainer,
            height: "55px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
            onClick={() => setCollapsed(!collapsed)}
          />
          <div>
            <Dropdown menu={{items}} trigger={["click"]}>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar
                  size={"default"}
                  shape="square"
                  icon={<UserOutlined/>}
                  style={{border: "1px solid #ccc"}}
                  className="border"
                />
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            margin: "24px 16px",
            overflow: 'hidden',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
