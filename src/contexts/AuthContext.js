import { createContext, useEffect, useState } from 'react';
import { Link, NavLink, useHistory, hashHistory } from 'react-router-dom';
import axios from 'axios';
import { loginUserApi } from '../api/Auth';
import { fetchProfileDetail } from '../api/Auth';
import { setItem } from '../utility/localStorageControl';
import Cookies from 'js-cookie';
import actions from '../redux/authentication/actions';
import { useDispatch, useSelector } from 'react-redux';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr, userProfile } = actions;

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // const { rtl, isLoggedIn, topMenu, darkMode, auth } = useSelector(state => {
  //   return {
  //     darkMode: state.ChangeLayoutMode.data,
  //     rtl: state.ChangeLayoutMode.rtlData,
  //     topMenu: state.ChangeLayoutMode.topMenu,
  //     isLoggedIn: state.auth.login,
  //     auth: state.fb.auth,
  //   };
  // });

  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [domain, setDomain] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let [user, setUser] = useState(
    localStorage.getItem('authTokens') ? {} : null,
    // null
  );

  // // let navigate = useHistory();
  // // get user profile if token exists and refresh page
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null,
  );

  useEffect(() => {
    if (process.env.REACT_APP_COMPANY_NAME) {
      setDomain(process.env.REACT_APP_COMPANY_NAME);
    }
  }, []);

  let getInitialProfile = async (token) => {
    const headers = { Authorization: 'Bearer ' + token };

    axios
      .get('/api/v1/users/profile', headers)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          // logic here
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //   Get profile uses token
  // let getProfile = async (token) => {
  //   const headers = { Authorization: 'Bearer ' + token };

  //   axios
  //     .get('/api/v1/users/profile', headers)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setUser(res.data.data);
  //       }
  //     })
  //     .catch((err) => {
  //       localStorage.clear();
  //       console.error(err);
  //     });
  // };

  const getProfile = async () => {
    try {
      const response = await fetchProfileDetail();
      if (response.status === 200) {
        setUser(response.data.data);
        dispatch(userProfile(response.data.data));
      }
    } catch (err) {
      localStorage.clear();
      // dispatch(logoutSuccess(true))
      // dispatch(logoutSuccess(true));
      console.error(err);
    }
  };

  useEffect(() => {
    if (authTokens) {
      getProfile();
    }
  }, [authTokens]);

  // useEffect(() => {
  //   // if (authTokens) {
  //   //   // This code sets authorization headers for all requests:
  //   //   axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens}`;
  //   //   getProfile(authTokens);
  //   // }

  //   getProfile();
  // }, [authTokens]);

  let registerUser = (fullnameInput, phoneInput, emailInput, passwordInput) => {
    let data = {
      fullname: fullnameInput,
      phone: phoneInput,
      email: emailInput,
      password: passwordInput,
      referer_id: '',
    };

    axios
      .post('/api/v1/users/register', data)
      .then((res) => {
        if (res.status === 200) {
          setSuccess({
            code: res.status,
            submit: 'Your account successfully created!',
          });
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message === 'User already registered') {
          setErrors({
            submit: 'This user already exist!',
          });
        } else {
          setErrors({
            submit: err?.response?.data?.message,
          });
        }
        console.error(err);
      });
  };

  let loginUser = async (emailInput, passwordInput) => {
    let data = { email: emailInput, password: passwordInput };
    try {
      const response = await loginUserApi(data);
      if (response.status === 200) {
        let token = response.data.data.token;
        setItem('authTokens', JSON.stringify(token));
        setAuthTokens(token);
        dispatch(loginSuccess(true));
        // setIsLoggedIn(true)
      }
    } catch (err) {
      console.error(err);
      setErrors({
        submit: 'Email or password is incorrect, please try again!',
      });
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    dispatch(logoutSuccess(true));
    // navigate.push('/login');
  };

  let contextData = {
    authTokens,
    setAuthTokens,
    loginUser,
    registerUser,
    user,
    setUser,
    getProfile,
    logoutUser,
    errors,
    setErrors,
    success,
    setSuccess,
    domain,
    history,
    isLoggedIn,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
