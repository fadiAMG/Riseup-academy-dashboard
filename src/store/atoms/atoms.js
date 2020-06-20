import { atom } from 'recoil';

export const User = atom({
  key: 'user',
  default: {
    loggedin: false,
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    username: '',
  },
});

export const Datatable = (name) =>
  atom({
    key: `Datatable${name}`,
    default: null,
  });
