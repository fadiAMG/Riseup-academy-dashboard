import React from 'react';
import { Spin, Space } from 'antd';

export const Spinner = () => {
  return (
    <div>
      <Space
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        size="middle"
      >
        <Spin size="large" />
      </Space>
    </div>
  );
};
