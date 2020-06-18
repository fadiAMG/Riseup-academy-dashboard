import React, { useEffect } from 'react';
import { Popup } from '../../sharedComponents/popup/popup';

const Login = () => {
  useEffect(() => {
    popupLogin();
  }, []);
  return <div></div>;
};

const popupLogin = () => {
  Popup(process.env.REACT_APP_SSO_DOMAIN + '/login', 'Login', 800, 400);
  var eventMethod = window.addEventListener
    ? 'addEventListener'
    : 'attachEvent';
  var eventer = window[eventMethod];
  var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

  eventer(
    messageEvent,
    function (e) {
      if (e.origin !== process.env.REACT_APP_SSO_DOMAIN) {
        return;
      }
      localStorage.setItem('token', e.data.token);
      window.location.replace('/home');
    },
    false
  );
};

export default Login;
