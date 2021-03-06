import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Unauthorized from '../components/403/Unauthorized';
import { Spinner } from '../sharedComponents';

const Dashboard = React.lazy(() => import('../components/dashboard'));

const Protected = ({
  component: Component,
  user,
  path,
  exact,
  requestedRole,
  ...rest
}) => {
  const isAuthed = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const authorized = requestedRole.includes(role) ? true : false;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthed && authorized) {
          return (
            <Suspense fallback={<Spinner />}>
              <Dashboard>
                <Component {...rest} {...props} />
              </Dashboard>
            </Suspense>
          );
        } else if (!isAuthed) {
          return <Redirect to="/login" />;
        } else if (!authorized) {
          return <Unauthorized />;
        }
      }}
    />
  );
};
export default Protected;
