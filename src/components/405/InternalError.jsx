import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
const InternalError = () => {
  return (
    <Result
      status="405"
      title="405"
      subTitle="Sorry, something went wrong."
      extra={
        <Link to="/home">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};
export default InternalError;
