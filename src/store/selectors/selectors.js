import { selector } from 'recoil';
import { User } from './../atoms/atoms';

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
