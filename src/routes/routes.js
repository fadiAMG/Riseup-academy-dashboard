import React from 'react';

const Courses = React.lazy(() => import('./../components/courses'));
const Login = React.lazy(() => import('./../components/login'));
const Home = React.lazy(() => import('../components/home'));

const NotFound = React.lazy(() => import('./../components/404/NotFound'));

const routes = [
  {
    path: '/login',
    exact: true,
    name: 'Login',
    component: Login,
  },
  {
    path: ['/', '/home'],
    exact: true,
    name: 'Home',
    component: Home,
    requestedRole: ['instructor', 'admin'],
  },
  {
    path: '/courses',
    exact: true,
    name: 'Courses',
    component: Courses,
    requestedRole: 'instructor',
  },
  {
    path: '*',
    exact: false,
    name: 'Not Found',
    component: NotFound,
  },
];

export default routes;
