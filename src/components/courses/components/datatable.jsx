import React from 'react';
import { Table } from 'antd';

export const Datatable = (props) => {
  const { columns, data } = props;
  return (
    <Table
      bordered
      rowKey={(data) => data._id}
      columns={columns}
      dataSource={data}
    />
  );
};
