import React from 'react';
import { Popup } from '../../sharedComponents/popup/popup';
import { useRecoilState } from 'recoil';
import { User } from '../../store/atoms/atoms';
import axios from 'axios';
import { Redirect } from 'react-router';
const Login = () => {
  const [user, setUser] = useRecoilState(User);

  if (!user.token) {
    Popup(process.env.REACT_APP_SSO_DOMAIN + '/login', 'Login', 800, 400);
    var eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

    eventer(
      messageEvent,
      async function (e) {
        if (e.origin !== process.env.REACT_APP_SSO_DOMAIN) {
          return;
        }
        localStorage.setItem('token', e.data.token);
        return await axios
          .get(process.env.REACT_APP_API_DOMAIN + '/api/v1/academy/me', {
            headers: { Authorization: `Bearer ${e.data.token}` },
          })
          .then((res) => {
            localStorage.setItem('email', res.data.user.email);
            localStorage.setItem('role', res.data.academyUser.role);
            setUser({
              loggedin: true,
              token: e.data.token,
              role: res.data.academyUser.role,
              email: res.data.user.email,
            });
            return <Redirect to="/home" />;
          });
      },
      false
    );
  } else {
    return <Redirect to="/home" />;
  }
  return <div></div>;
};

export default Login;
