import React from 'react';
import { Skeleton } from '../loadingIndicator/Skeleton';
import { RemoveUser } from '../../store/selectors/selectors';
import { useResetRecoilState } from 'recoil';
import { showNotification } from '../../helpers/showNotification';

export const RenderDataTable = ({ data, columns, component: Component }) => {
  const removeUser = useResetRecoilState(RemoveUser);

  switch (data.state) {
    case 'hasValue':
      return <Component data={data.contents} columns={columns} />;

    case 'loading':
      return <Skeleton />;

    case 'hasError':
      const status = data.contents.response.status;
      if (status === 401 || status === 403) {
        removeUser();
        showNotification('warning', 'Session Expired', 'Please Login again');
      }
      break;

    default:
  }
};
