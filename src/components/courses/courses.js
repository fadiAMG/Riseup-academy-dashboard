import React from 'react';
import { CoursesView } from './courses.view';
import { Actions } from './components/actions';
import { fetchCourses } from '../../store/selectors/selectors';
import { useRecoilValueLoadable } from 'recoil';
import { Tag } from 'antd';

const Courses = () => {
  const data = useRecoilValueLoadable(fetchCourses);
  return <CoursesView data={data} columns={columns} />;
};

export default Courses;

const columns = [
  { title: 'Name', dataIndex: 'courseName' },
  {
    title: 'Description',
    dataIndex: 'courseDescription',
  },
  { title: 'Level', dataIndex: 'level' },
  { title: 'Course Hours', dataIndex: 'courseLength' },
  { title: 'Language', dataIndex: 'language' },
  {
    title: 'Tags',
    dataIndex: 'tags',
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  { title: 'Status', dataIndex: 'status' },
  {
    title: 'Action',
    key: 'operation',
    render: (record) => <Actions record={record._id} />,
  },
];
