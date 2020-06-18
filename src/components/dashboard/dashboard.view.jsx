import React from 'react';
import { Layout, Menu, message, Dropdown, Button, Row, Col } from 'antd';
import {
  LogoutOutlined,
  VideoCameraOutlined,
  TeamOutlined,
  HomeOutlined,
  FormOutlined,
  PlayCircleOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const DashboardView = (props) => {
  const { role } = props;
  const Admin = () => {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          Series
        </Menu.Item>
        <Menu.Item key="3" icon={<FormOutlined />}>
          Articles
        </Menu.Item>
        <Menu.Item key="4" icon={<TeamOutlined />}>
          Users
        </Menu.Item>
      </Menu>
    );
  };
  const Instructor = () => {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="2" icon={<FileDoneOutlined />}>
          Courses
        </Menu.Item>
        <Menu.Item key="3" icon={<PlayCircleOutlined />}>
          Episodes
        </Menu.Item>
        <Menu.Item key="4" icon={<TeamOutlined />}>
          My Students
        </Menu.Item>
      </Menu>
    );
  };
  function handleMenuClick(e) {
    message.info('Logged Out Successfully');
    console.log('click', e);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<LogoutOutlined />}>
        Signout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sider breakpoint="md" theme="dark" style={SiderStyle}>
        <div style={Logo}>
          <img style={LogoImg} src="./assets/logo.svg" alt="logo" />
        </div>
        {role && role === 'admin' ? <Admin /> : <Instructor />}
      </Sider>
      <Layout style={LayoutStyle}>
        <Header style={HeaderStyle}>
          <Row justify="end">
            <Col>
              <Dropdown overlay={menu} placement="bottomCenter">
                <Button style={UserNameBtn}>Instructor Mohamed Adel</Button>
              </Dropdown>
            </Col>
          </Row>
        </Header>
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
  boxShadow: '2px 0 6px rgba(0,21,41,.35)',
  height: '100vh',
  position: 'fixed',
  left: 0,
};
const Logo = {
  height: 40.2,
  margin: 10,
};
const LogoImg = {
  height: 50,
};
const LayoutStyle = { marginLeft: 200 };
const HeaderStyle = {
  backgroundColor: 'white',
  padding: 0,
  boxShadow: '0 1px 4px rgba(0,21,41,.08)',
};
const ContentStyle = { margin: '24px 16px 0', overflow: 'initial' };
const FooterStyle = { textAlign: 'center' };
const BodyStyle = {
  backgroundColor: 'white',
  padding: 24,
  textAlign: 'center',
};
const UserNameBtn = {
  border: 0,
};
