import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase';
import { ConfigProvider, Spin } from 'antd';
import { AuthProvider } from './contexts/AuthContext';
import store, { rrfProps } from './redux/store';
import Admin from './routes/admin';
import Customer from './routes/customer';
import Coordinator from './routes';
import Auth from './routes/auth';
import './static/css/style.css';
import config from './config/config';
import ProtectedRoute from './components/utilities/protectedRoute';
import 'antd/dist/antd.less';
import actions from './redux/authentication/actions';

const { loginSuccess } = actions;

const { theme } = config;

const ProviderConfig = () => {
  const dispatch = useDispatch();
  const { rtl, isLoggedIn, topMenu, darkMode, auth, profile } = useSelector((state) => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
      auth: state.fb.auth,
      profile: state.auth.profile,
    };
  });

  const getProfile = async () => {
    console.log('call getprofile');
    try {
      const response = await fetchProfileDetail();
      if (response.status === 200) {
        console.log('getprofile:', response);
        setUser(response.data.data);
        dispatch(userProfile(response.data.data));
      }
    } catch (err) {
      // localStorage.clear();
      // dispatch(logoutSuccess(true))
      // dispatch(logoutSuccess(true));
      console.error(err);
    }
  };

  const [userRole, setUserRole] = useState();
  // const { rtl, topMenu, darkMode, auth } = useSelector(state => {
  //   return {
  //     darkMode: state.ChangeLayoutMode.data,
  //     rtl: state.ChangeLayoutMode.rtlData,
  //     topMenu: state.ChangeLayoutMode.topMenu,
  //     auth: state.fb.auth,
  //   };
  // });

  // console.log('APP PROFILE:', profile?.group?.role);

  useEffect(() => {
    if (profile) {
      dispatch(loginSuccess(true));
    }
  }, [profile]);

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  return (
    <AuthProvider>
      <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
        {/* <AuthProvider> */}
        <ThemeProvider theme={{ ...theme, rtl, topMenu, darkMode }}>
          {/* <AuthProvider> */}
          <ReactReduxFirebaseProvider {...rrfProps}>
            {!isLoaded(auth) ? (
              <div className="spin">
                <Spin />
              </div>
            ) : (
              <Router basename={process.env.PUBLIC_URL}>
                {!isLoggedIn ? <Route path="/" component={Auth} /> : <ProtectedRoute path="/admin" component={Admin} />}
                {isLoggedIn && (path === process.env.PUBLIC_URL || path === `${process.env.PUBLIC_URL}/`) && (
                  <Redirect to="/admin" />
                )}
              </Router>
            )}
          </ReactReduxFirebaseProvider>
          {/* </AuthProvider> */}
        </ThemeProvider>
        {/* </AuthProvider> */}
      </ConfigProvider>
    </AuthProvider>
  )
  }

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

export default hot(App);
