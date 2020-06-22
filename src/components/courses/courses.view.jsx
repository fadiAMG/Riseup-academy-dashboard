import React from 'react';
import { Button, Tooltip } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { fetchCourses } from '../../store/selectors/selectors';
import { Header } from '../../sharedComponents/header/Header';
import { Datatable } from '../../sharedComponents/datatable/datatable';
import { RenderDataTable } from '../../sharedComponents/renderDataTable/RenderDataTable';

export const CoursesView = (props) => {
  const { columns, data } = props;
  const syncData = useSetRecoilState(fetchCourses);
  return (
    <div>
      <Header name={'Courses'} />
      <div style={BtnContainer}>
        <Link to="courses/create">
          <Button type="primary">Create Course</Button>
        </Link>
        <Tooltip title="Sync">
          <Button
            type="primary"
            shape="circle"
            onClick={syncData}
            icon={
              <SyncOutlined spin={data.state === 'loading' ? true : false} />
            }
          />
        </Tooltip>
      </div>
      <RenderDataTable columns={columns} data={data} component={Datatable} />
    </div>
  );
};
const BtnContainer = {
  marginBottom: 16,
  display: 'flex',
  justifyContent: 'space-between',
};
