import React from 'react';

const Courses = React.lazy(() => import('./../components/courses'));
const CoursesForm = React.lazy(() =>
  import('./../components/courses/components/CoursesForm')
);
const LessonForm = React.lazy(() =>
  import('./../components/courses/components/LessonForm')
);
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
    path: ['/courses/create', '/courses/edit/:id'],
    exact: true,
    name: 'CoursesForm',
    component: CoursesForm,
    requestedRole: 'instructor',
  },
  {
    path: ['/courses/:courseId/lesson/create', '/courses/lesson/edit/:id'],
    exact: true,
    name: 'LessonForm',
    component: LessonForm,
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
