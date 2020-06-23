import React from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { DownOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { useSetRecoilState } from 'recoil';
import { drawerState } from '../../../store/atoms/atoms';

const Actions = (props) => {
  const { record, showDrawer, showPollDrawer } = props;
  const setDrawerData = useSetRecoilState(drawerState);
  const handleMenu = (e) => {
    switch (e.key) {
      case '1':
        setDrawerData(record);
        showDrawer();
        break;

      case '2':
        setDrawerData(record);
        showPollDrawer();
        break;

      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={handleMenu}>
      <Menu.Item icon={<EyeOutlined />} key="1">
        View
      </Menu.Item>
      <Menu.Item icon={<PlusOutlined />} key="2">
        Add New Poll
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button>
        Actions <DownOutlined />
      </Button>
    </Dropdown>
  );
};
export default Actions;
