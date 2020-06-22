import React from 'react';
import { Drawer, Button, Descriptions, Badge, Tag } from 'antd';
import { useRecoilValue } from 'recoil';
import { drawerState } from '../../../store/atoms/atoms';
import { useHistory } from 'react-router';

const ViewCourse = ({ drawer, onClose }) => {
  const drawerData = useRecoilValue(drawerState);
  const history = useHistory();

  const {
    courseName,
    _id,
    courseDescription,
    courseLength,
    createdAt,
    lessons,
    level,
    questions,
    startDate,
    status,
    subscription,
    tags,
    updatedAt,
  } = drawerData;
  return (
    <>
      {drawerData && (
        <Drawer
          title={courseName}
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
          <Descriptions title="Course Info" layout="vertical" bordered>
            <Descriptions.Item label="Course ID" span={3}>
              {_id}
            </Descriptions.Item>
            <Descriptions.Item label="Start Date">
              {startDate}
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={3}>
              {courseDescription}
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
              <Badge status="processing" text={status} />
            </Descriptions.Item>
            <Descriptions.Item label="Subscription Type">
              {subscription}
            </Descriptions.Item>
            <Descriptions.Item label="Hours">{courseLength}</Descriptions.Item>
            <Descriptions.Item label="Level">{level}</Descriptions.Item>
            <Descriptions.Item label="Tags" span={3}>
              {tags &&
                tags.length >= 1 &&
                tags.map((tag, index) => (
                  <Tag
                    key={index}
                    color={'#' + (((1 << 24) * Math.random()) | 0).toString(16)}
                  >
                    {tag}
                  </Tag>
                ))}
            </Descriptions.Item>
            {questions &&
              questions.length >= 1 &&
              questions.map((question, index) => (
                <React.Fragment key={index}>
                  <Descriptions.Item label="Question">
                    {question.text}
                  </Descriptions.Item>
                  <Descriptions.Item label="Answer">
                    {question.expectedAnswer}
                  </Descriptions.Item>
                  <Descriptions.Item label="Choices">
                    {question.choices &&
                      question.choices.map((choice, index) => (
                        <h5 key={index}>{choice}</h5>
                      ))}
                  </Descriptions.Item>
                </React.Fragment>
              ))}
            {lessons &&
              lessons.length >= 1 &&
              lessons.map((lesson, index) => (
                <React.Fragment key={index}>
                  <Descriptions.Item label="Lesson Name">
                    {lesson.lessonName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Lesson Type">
                    {lesson.lessonType}
                  </Descriptions.Item>
                  <Descriptions.Item label="Lesson Description">
                    {lesson.lessonDescription}
                  </Descriptions.Item>
                  <Descriptions.Item label="Actions" span={3}>
                    <Button
                      onClick={() =>
                        history.push(`courses/lesson/edit/${lesson._id}`)
                      }
                    >
                      Edit
                    </Button>
                  </Descriptions.Item>
                </React.Fragment>
              ))}
            <Descriptions.Item label="Created At" span={3}>
              {createdAt}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At" span={3}>
              {updatedAt}
            </Descriptions.Item>
          </Descriptions>
          ,
        </Drawer>
      )}
    </>
  );
};
export default ViewCourse;
