import React from 'react';
import { Skeleton as AntDSkelecton } from 'antd';

export const Skeleton = () => {
  return <AntDSkelecton active paragraph={{ rows: 6 }} />;
};
