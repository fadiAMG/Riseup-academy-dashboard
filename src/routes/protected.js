import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Protected = ({
  component: Component,
  user,
  path,
  exact = false,
  requestedRole,
  ...rest
}) => {
  const isAuthed = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const authorized = requestedRole === role ? true : false;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthed && authorized) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/unauthorized',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
export default Protected;
