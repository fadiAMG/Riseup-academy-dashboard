import React from 'react';
import { Drawer, Button, Row, Col, Form, Input } from 'antd';
import { useRecoilValue } from 'recoil';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { drawerState } from '../../../store/atoms/atoms';
import { showNotification, api, urls } from '../../../helpers';

const CreatePolls = ({ drawer, onClose }) => {
  const drawerData = useRecoilValue(drawerState);
  const { _id } = drawerData;

  const onFinish = (values) => {
    api
      .postData(`${urls.episode}/${_id}/poll`, values, 'POST')
      .then((res) => {
        showNotification('success', 'Success', res.data.message);
        onClose();
      })
      .catch(() =>
        showNotification(
          'error',
          "Couldn't Create Poll",
          'Something went wrong. Internal Server Error'
        )
      );
  };
  return (
    <>
      {drawerData && (
        <Drawer
          title="Create New Poll"
          width={720}
          onClose={onClose}
          visible={drawer}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
            </div>
          }
        >
          <Form onFinish={onFinish} layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="title" label="Title">
                  <Input placeholder="Title" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="description" label="Description">
                  <Input style={{ width: '100%' }} placeholder="Description" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.List name="answers">
                  {(fields, { add, remove }) => {
                    return (
                      <div>
                        {fields.map((field, index) => (
                          <Form.Item
                            label={index === 0 ? 'Answer Options' : ''}
                            required={false}
                            key={field.key}
                          >
                            <Form.Item {...field} noStyle>
                              <Input
                                placeholder="Answer"
                                style={{ width: '60%' }}
                              />
                            </Form.Item>
                            {fields.length > 1 ? (
                              <MinusCircleOutlined
                                style={{ margin: '0 8px' }}
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            ) : null}
                          </Form.Item>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                            }}
                            style={{ width: '100%' }}
                          >
                            <PlusOutlined /> Add Answer
                          </Button>
                        </Form.Item>
                      </div>
                    );
                  }}
                </Form.List>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          ,
        </Drawer>
      )}
    </>
  );
};
export default CreatePolls;
