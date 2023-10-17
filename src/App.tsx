import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes  } from 'react-router-dom';
import {  connect } from 'react-redux'
import ValidateAuthMiddleware from './redux/middleware/ValidateAuth'
import type { RootState } from './redux/store'
import { Toaster } from 'react-hot-toast';
import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import AuthPage from './pages/Authentication/AuthPage';
import Loader from './common/Loader';
import routes from './routes';




const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App(props : any)
{
  // console.log("App Start", props) 
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

        <Route element={<ValidateAuthMiddleware {...props} />}>
          {/*  RUTAS SIN TEMPLATE */}
          <Route path="/auth/signup" element={<SignUp />} />
          
          {/* RUTAS CON TEMPLATE DEFAULT */}
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


function mapStateToProps(state:RootState)
{
    return {
        SESSION: state.session,
    }
}
export default connect(mapStateToProps, null)(App);

 