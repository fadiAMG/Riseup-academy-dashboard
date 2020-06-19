import { atom } from 'recoil';

export const User = atom({
  key: 'user',
  default: {
    loggedin: false,
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
  },
});
export const CurrRoute = atom({
  key: 'currRoute',
  default: { component: '/home', key: '1' },
});
