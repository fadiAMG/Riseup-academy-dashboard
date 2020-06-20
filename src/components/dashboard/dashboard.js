import React from 'react';
import DashboardView from './dashboard.view';
import { message } from 'antd';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { User } from '../../store/atoms/atoms';
import { useLocation } from 'react-router-dom';
import { RemoveUser } from '../../store/selectors/selectors';
const routeId = {
  '/': '1',
  '/home': '1',
  '/series': '2',
  '/articles': '3',
  '/users': '4',
  '/courses': '5',
  '/episodes': '6',
  '/students': '7',
};
const Dashboard = (props) => {
  const user = useRecoilValue(User);
  const location = useLocation();
  const activeRoute = routeId[location.pathname];
  const removeUser = useResetRecoilState(RemoveUser);
  const handleSignout = () => {
    message.info('Logged Out Successfully');
    removeUser();
  };

  return (
    <DashboardView
      {...props}
      handleSignout={handleSignout}
      activeRoute={activeRoute}
      user={user}
    />
  );
};
export default Dashboard;
