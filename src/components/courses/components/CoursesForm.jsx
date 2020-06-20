/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, DatePicker, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';

import { Header } from '../../../sharedComponents/header/Header';
import { QuestionsModal } from './QuestionsModal';
import { api, urls, showNotification } from '../../../helpers';
import { fetchCourses } from '../../../store/selectors/selectors';

const CoursesForm = () => {
  const [visible, setVisible] = useState(false);
  const [questions, setQuestions] = useState([]);
  const syncData = useSetRecoilState(fetchCourses);
  const history = useHistory();

  const onCreate = (values) => {
    const joined = questions.concat(values);
    setQuestions(joined);
    setVisible(false);
  };

  const onFinish = (values) => {
    const startDate = values.startDate._d.toISOString();
    api
      .postData(urls.course, { questions, ...values, startDate })
      .then(() => {
        syncData();
        showNotification('success', 'Success', 'Course Created Successfully');
        history.goBack();
      })
      .catch(() =>
        showNotification(
          'error',
          "Couldn't Create Course",
          'Something went wrong. Internal Server Error'
        )
      );
  };

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const formItemLayout = {
    labelCol: {
      sm: { span: 4 },
    },
    wrapperCol: {
      sm: { span: 2 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      sm: { span: 2, offset: 4 },
    },
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  return (
    <div>
      <Header showBack={true} name={'Create Course'} />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={'courseName'}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={'courseDescription'} label="Description">
          <Input />
        </Form.Item>
        <Form.Item
          name={'courseLength'}
          label="Hours"
          rules={[{ required: true, type: 'number', min: 1, max: 300 }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={'startDate'}
          label="Start Time"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name={'level'} label="Level">
          <Select>
            <Select.Option value="beginner">Beginner</Select.Option>
            <Select.Option value="intermediate">Intermediate</Select.Option>
            <Select.Option value="advanced">Advanced</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={'subscription'}
          label="Subscription"
        >
          <Select>
            <Select.Option value="free">Free</Select.Option>
            <Select.Option value="paid">Paid</Select.Option>
            <Select.Option value="question-based">Question Based</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={'language'}
          label="Language"
        >
          <Select>
            <Select.Option value="english">English</Select.Option>
            <Select.Option value="arabic">Arabic</Select.Option>
            <Select.Option value="french">French</Select.Option>
          </Select>
        </Form.Item>
        <Form.List rules={[{ required: true }]} name={'tags'}>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0
                      ? formItemLayout
                      : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'Tags' : ''}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item {...field} noStyle>
                      <Input placeholder="Tag" style={{ width: '60%' }} />
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
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    style={{ width: '100%' }}
                  >
                    <PlusOutlined /> Add Tag
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button
            type="dashed"
            onClick={() => {
              setVisible(true);
            }}
            style={{ width: '100%' }}
          >
            <PlusOutlined /> Add a New Question
          </Button>
        </Form.Item>
        <QuestionsModal
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CoursesForm;
