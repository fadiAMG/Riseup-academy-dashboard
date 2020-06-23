import React, { useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Tag } from 'antd';

import { CoursesView } from './courses.view';
import { Actions, ViewCourse } from './components';
import { fetchCourses } from '../../store/selectors/selectors';
import { api, showNotification, urls } from '../../helpers';

const Courses = () => {
  const data = useRecoilValueLoadable(fetchCourses);
  const [drawer, setDrawer] = useState(false);
  const deleteCourse = (id) => {
    api
      .deleteData(`${urls.course}/${id}`)
      .then(() =>
        showNotification('success', 'Success', 'Course Deleted Successfully')
      )
      .catch(
        showNotification(
          'error',
          "Couldn't Delete Course",
          'Something went wrong. Internal Server Error'
        )
      );
  };
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
      render: (record) => (
        <Actions
          deleteCourse={deleteCourse}
          showDrawer={() => setDrawer(true)}
          record={record}
        />
      ),
    },
  ];
  return (
    <>
      <CoursesView data={data} columns={columns} />
      <ViewCourse drawer={drawer} onClose={() => setDrawer(false)} />
    </>
  );
};
export default Courses;
