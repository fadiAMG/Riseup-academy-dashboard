import React from 'react';
import { Button, Tooltip } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useSetRecoilState } from 'recoil';

import { fetchStudents } from '../../store/selectors/selectors';
import { Header, Datatable, RenderDataTable } from '../../sharedComponents';

export const StudentsView = (props) => {
  const { columns, data } = props;
  const syncData = useSetRecoilState(fetchStudents);
  return (
    <div>
      <Header name={'My Students'} />
      <div style={BtnContainer}>
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
  justifyContent: 'flex-end',
};
