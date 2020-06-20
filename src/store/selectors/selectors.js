import { selector } from 'recoil';
import { User, Datatable } from './../atoms/atoms';
import api from '../../helpers/api';

export const RemoveUser = selector({
  key: 'removeUser',
  set: ({ set }) => {
    set(User, { loggedIn: false, token: null, role: null });
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    var iframe = document.createElement('iframe');
    iframe.src = process.env.REACT_APP_SSO_DOMAIN + '/signup';
    document.body.appendChild(iframe);
    iframe.style.display = 'none';
    iframe.addEventListener('load', (ev) => {
      iframe.onload = window.location.reload();
    });
  },
});

export const fetchCourses = selector({
  key: 'fetchCourses',
  get: async ({ get }) => {
    get(Datatable('courses'));
    const res = await api.getData('/api/v1/academy/course/my');
    const data = await res.data;
    return data.courses;
  },
  set: async ({ set }) => set(Datatable('courses'), Math.random()),
});
