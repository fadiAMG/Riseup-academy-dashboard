import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export const QuestionsModal = ({ visible, onCreate, onCancel }) => {
  const [question] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new question"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        question.validateFields().then((values) => {
          question.resetFields();
          onCreate(values);
        });
      }}
    >
      <Form form={question} layout="vertical">
        <Form.Item name="text" label="Title">
          <Input type="text" />
        </Form.Item>
        <Form.Item name="type" label="Type">
          <Select>
            <Select.Option value="tf">True & False</Select.Option>
            <Select.Option value="choices">Multiple Choice</Select.Option>
            <Select.Option value="free">Free Text</Select.Option>
          </Select>
        </Form.Item>
        <Form.List name="choices">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item
                    label={index === 0 ? 'Choices' : ''}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item {...field} noStyle>
                      <Input placeholder="Choice" style={{ width: '60%' }} />
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
                    <PlusOutlined /> Add Choices
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <Form.Item name="expectedAnswer" label="Expected Answer">
          <Input type="text" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
