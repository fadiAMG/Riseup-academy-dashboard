/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
  message,
} from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import { Header, TinyMCE, FileUpload } from '../../../sharedComponents';
import { api, urls, showNotification } from '../../../helpers';

const LessonForm = () => {
  const [form] = Form.useForm();
  const [mode, setMode] = useState('Create');
  const [type, setType] = useState('');
  const [editor, setEditor] = useState('');
  const history = useHistory();
  const { courseId, id } = useParams();

  useEffect(() => {
    if (id) {
      setMode('Edit');
      api.getData(`${urls.lesson}/${id}`).then((res) => {
        const { lesson } = res.data;
        const { liveStreamData } = lesson;
        form.setFieldsValue({
          ...lesson,
          ...liveStreamData,
          liveStreamStartTime: moment(liveStreamData.liveStreamStartTime),
        });
      });
    }
  }, [form, id]);

  const onFinish = (values) => {
    let {
      Thumbnail,
      Video,
      liveStreamStartTime,
      liveStreamPassword,
      ...data
    } = values;
    const thumbnailUrl = Thumbnail ? Thumbnail[0].response : null;
    const videoUrl = type === 'video' ? Video[0] && Video[0].response : null;
    const liveStream = type === 'livestream' ? true : false;
    liveStreamStartTime =
      type === 'livestream' ? liveStreamStartTime._d.toISOString() : null;
    const lessonData = {
      ...data,
      thumbnailUrl,
      videoUrl,
      liveStream,
      liveStreamData: {
        liveStreamStartTime,
        liveStreamPassword,
      },
      text: editor,
    };
    const method = mode === 'Create' ? 'POST' : 'PATCH';
    const url =
      mode === 'Create'
        ? `${urls.course}/${courseId}/lesson`
        : urls.lesson + `/${id}`;

    api
      .postData(url, lessonData, method)
      .then(() => {
        showNotification('success', 'Success', `Lesson ${mode}d Successfully`);
        history.goBack();
      })
      .catch(() =>
        showNotification(
          'error',
          "Couldn't Create Lesson",
          'Something went wrong. Internal Server Error'
        )
      );
  };
  const uploadFile = (e) => {
    if (e.fileList[0].status === 'done') {
      message.success(`${e.fileList[0].name} file uploaded successfully`);
    } else if (e.fileList[0].status === 'error') {
      message.error(`${e.fileList[0].name} file upload failed.`);
    }

    return e && e.fileList;
  };

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
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
      <Header showBack={true} name={`${mode} Lesson`} />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        form={form}
      >
        <Form.Item
          name={'lessonName'}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input value="WWW" />
        </Form.Item>
        <Form.Item
          name={'lessonDescription'}
          label="Description"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'lessonLength'}
          label="Hours"
          rules={[{ required: true, type: 'number', min: 1, max: 300 }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={'lessonType'}
          label="Type"
        >
          <Select onChange={(e) => setType(e)}>
            <Select.Option value="text">Article</Select.Option>
            <Select.Option value="video">Video</Select.Option>
            <Select.Option value="livestream">Live Stream</Select.Option>
          </Select>
        </Form.Item>
        <FileUpload
          wrapperCol={{ ...layout.wrapperCol, offset: 4 }}
          uploadFile={uploadFile}
          name="Thumbnail"
        />

        {type === 'text' && (
          <TinyMCE handleEditorChange={(e) => setEditor(e)} />
        )}
        {type === 'video' && (
          <FileUpload
            wrapperCol={{ ...layout.wrapperCol, offset: 4 }}
            uploadFile={uploadFile}
            name="Video"
          />
        )}
        {type === 'livestream' && (
          <>
            <Form.Item
              label="Password"
              name="liveStreamPassword"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="liveStreamStartTime" label="Start Date">
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
          </>
        )}

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LessonForm;
