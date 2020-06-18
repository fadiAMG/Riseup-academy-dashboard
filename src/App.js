import React, { Suspense } from 'react';
import './App.less';
import { Switch, BrowserRouter } from 'react-router-dom';
import { routes, Protected } from './routes';

const menu = routes.map((route, index) => {
  return (
    route.component && (
      // <Protected
      //   key={index}
      //   path={route.path}
      //   exact={route.exact}
      //   requestedRole={'instructor'}
      //   render={(props) => <route.component {...props} />}
      // />
      <Protected
        key={index}
        name={route.name}
        exact={route.exact}
        path={route.path}
        component={route.component}
        requestedRole={'instructor'}
      />
    )
  );
});

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading</div>}>
        <Switch>{menu}</Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
