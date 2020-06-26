import React from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { DownOutlined, CheckOutlined } from '@ant-design/icons';
import { useSetRecoilState } from 'recoil';
import { api, urls, showNotification } from '../../../helpers';
import { fetchStudents } from '../../../store/selectors/selectors';

const Actions = (props) => {
  const syncData = useSetRecoilState(fetchStudents);
  const { record } = props;
  const handleMenu = (e) => {
    const userId = record.enrolledUser.user;
    api
      .postData(
        `${urls.enrollment}/${record._id}/status`,
        { userId, status: 'Accepted' },
        'PATCH'
      )
      .then(() => {
        showNotification('success', 'Success', `Student Approved`);
        syncData();
      })
      .catch(() =>
        showNotification(
          'error',
          "Couldn't Approve Student",
          'Something went wrong. Internal Server Error'
        )
      );
  };
  const menu = (
    <Menu onClick={handleMenu}>
      <Menu.Item icon={<CheckOutlined />} key="1">
        Approve Student
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
