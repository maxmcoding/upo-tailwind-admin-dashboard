import { Suspense, lazy, useEffect, ReactNode } from 'react';
import React, { useContext, createContext, useState } from "react";
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from './redux/store'

import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import AuthPage from './pages/Authentication/AuthPage';
import Loader from './common/Loader';
import routes from './routes';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App()
{
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() =>
  {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>

        
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/oauth/signin/:code" element={<AuthPage />} />

        <Route element={<ProvideAuth />}>
          <Route path="/auth/signup" element={<SignUp />} />
          <Route element={<DefaultLayout />}>
            <Route index element={<ECommerce />} />
            {routes.map((routes, index) =>
            {
              const { path, component: Component } = routes;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
        </Route>


      </Routes>
    </>
  );
}

export default App;




////////////////////////////
////// This code receives a 'children' component and other props and checks if a session is valid to provide authentication.
////////////////////////////
function ProvideAuth() 
{
  const session = useSelector((state: RootState) => state.session)
  if ( session.expires_in === 10000)
  {
    console.log(" No hay session")
    return (<Navigate to="/auth/signin" replace={true} />);
  }
  return (<Outlet />);
}
