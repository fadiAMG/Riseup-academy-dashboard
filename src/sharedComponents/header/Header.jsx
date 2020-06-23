import React from 'react';
import { PageHeader } from 'antd';
import { useHistory } from 'react-router-dom';

const Header = (props) => {
  const { name, showBack } = props;
  const history = useHistory();

  return <PageHeader onBack={showBack ? history.goBack : false} title={name} />;
};
export default Header;
