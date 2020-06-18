import React from 'react';
import DashboardView from './dashboard.view';
import { message } from 'antd';

const Dashboard = (props) => {
  const handleSignout = (e) => {
    message.info('Logged Out Successfully');
    console.log('click', e);
  };

  return <DashboardView {...props} handleSignout={handleSignout} />;
};
export default Dashboard;
