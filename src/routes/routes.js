import React from 'react';

const Login = React.lazy(() => import('./../components/login'));
const NotFound = React.lazy(() => import('./../components/404/NotFound'));

const routes = [
  {
    path: '/login',
    exact: true,
    name: 'Login',
    component: Login,
  },
  {
    path: '*',
    exact: false,
    name: 'Not Found',
    component: NotFound,
  },
];

export default routes;
