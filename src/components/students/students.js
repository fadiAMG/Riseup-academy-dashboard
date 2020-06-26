import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Tag } from 'antd';

import { Actions } from './components';
import { fetchStudents } from '../../store/selectors/selectors';
import { StudentsView } from './students.view';

const Students = () => {
  const data = useRecoilValueLoadable(fetchStudents);
  const columns = [
    { title: 'Course ID', dataIndex: 'course' },
    { title: 'Status', dataIndex: 'status' },
    {
      title: 'Answers',
      dataIndex: 'answers',
      render: (answers) => (
        <>
          {answers.map((answer) => {
            return <Tag key={answer}>{answer}</Tag>;
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      render: (record) => <Actions record={record} />,
    },
  ];
  return (
    <>
      <StudentsView data={data} columns={columns} />
    </>
  );
};
export default Students;
