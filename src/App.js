import React, { Suspense } from 'react';
import './App.less';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { routes, Protected } from './routes';
import { Spinner } from './sharedComponents/loadingIndicator/Spinner';
import ErrorBoundary from './sharedComponents/errorBoundary';

const dashboard = routes.map((route, index) => {
  return route.requestedRole ? (
    <Protected
      key={index}
      name={route.name}
      exact={route.exact}
      path={route.path}
      component={route.component}
      requestedRole={route.requestedRole}
    />
  ) : (
    <Route
      key={index}
      path={route.path}
      exact={route.exact}
      name={route.name}
      render={(props) => <route.component {...props} />}
    />
  );
});

const App = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Switch>{dashboard}</Switch>
          </Suspense>
        </ErrorBoundary>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
