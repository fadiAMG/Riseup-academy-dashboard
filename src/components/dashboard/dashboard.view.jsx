import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const DashboardView = (props) => {
  return (
    <Layout>
      <Sider breakpoint="md" theme="dark" style={SiderStyle}>
        <div style={Logo} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Home
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={LayoutStyle}>
        <Header style={HeaderStyle} />
        <Content style={ContentStyle}>
          <div style={BodyStyle}>{props.children}</div>
        </Content>
        <Footer style={FooterStyle}>Riseup</Footer>
      </Layout>
    </Layout>
  );
};
export default DashboardView;

const SiderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  left: 0,
};
const Logo = {
  height: 28.2,
  background: 'yellow',
  margin: 16,
};
const LayoutStyle = { marginLeft: 200 };
const HeaderStyle = { padding: 0 };
const ContentStyle = { margin: '24px 16px 0', overflow: 'initial' };
const FooterStyle = { textAlign: 'center' };
const BodyStyle = { padding: 24, textAlign: 'center' };
