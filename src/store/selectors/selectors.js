import { selector } from 'recoil';
import { User, Datatable } from './../atoms/atoms';
import { urls, api } from '../../helpers';

export const RemoveUser = selector({
  key: 'removeUser',
  set: ({ set }) => {
    set(User, { loggedIn: false, token: null, role: null });
    localStorage.clear();
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
    const res = await api.getData(urls.myCourses);
    const data = await res.data.courses;
    return data;
  },
  set: async ({ set }) => set(Datatable('courses'), Math.random()),
});

export const fetchEpisodes = selector({
  key: 'fetchEpisodes',
  get: async ({ get }) => {
    get(Datatable('episodes'));
    const res = await api.getData(urls.me);
    const data = await res.data.academyUser.assignedEpisodes;
    return data;
  },
  set: async ({ set }) => set(Datatable('episodes'), Math.random()),
});
