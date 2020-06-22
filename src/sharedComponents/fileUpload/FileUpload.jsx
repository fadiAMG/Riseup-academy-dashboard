import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button, Form } from 'antd';
const props = {
  action: process.env.REACT_APP_API_DOMAIN + '/api/v1/academy/upload',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  listType: 'picture',
};
const FileUpload = ({ name, uploadFile, wrapperCol }) => {
  return (
    <Form.Item
      wrapperCol={wrapperCol}
      name={name}
      valuePropName="fileList"
      getValueFromEvent={uploadFile}
    >
      <Upload {...props}>
        <Button>
          <UploadOutlined /> {`Upload ${name}`}
        </Button>
      </Upload>
    </Form.Item>
  );
};
export default FileUpload;
