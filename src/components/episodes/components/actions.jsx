import React from 'react';
import { Button, Menu, Dropdown } from 'antd';
import {
  DownOutlined,
  EyeOutlined,
  PlusOutlined,
  RadarChartOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { drawerState } from '../../../store/atoms/atoms';

export const Actions = (props) => {
  const { record, showDrawer, deleteCourse } = props;
  const setDrawerData = useSetRecoilState(drawerState);
  const history = useHistory();
  const handleMenu = (e) => {
    switch (e.key) {
      case '1':
        setDrawerData(record);
        showDrawer();
        break;

      case '2':
        history.push(`courses/edit/${record._id}`);
        break;

      case '3':
        deleteCourse(record._id);
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
      <Menu.Item icon={<RadarChartOutlined />} key="3">
        View Polls
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
