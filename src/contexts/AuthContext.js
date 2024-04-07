import { createContext, useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { loginUserApi } from '../api/Auth';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // const history = useHistory();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [domain, setDomain] = useState('');
  let [user, setUser] = useState(
    localStorage.getItem('authTokens') ? {} : null,
    // null
  );

  // let navigate = useHistory();
  // get user profile if token exists and refresh page
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
  let getProfile = async (token) => {
    const headers = { Authorization: 'Bearer ' + token };

    axios
      .get('/api/v1/users/profile', headers)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.data);
        }
      })
      .catch((err) => {
        localStorage.clear();
        console.error(err);
      });
  };

  useEffect(() => {
    if (authTokens) {
      // This code sets authorization headers for all requests:
      axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens}`;
      getProfile(authTokens);
    }
  }, [authTokens]);

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
        localStorage.setItem('authTokens', JSON.stringify(token));
        // history.push('admin/home-page');
        setAuthTokens(token);
      }
    } catch (err) {
      console.error(err);
      setErrors({
        submit: 'Email or password is incorrect, please try again!',
      });
    }

    // axios
    //   .post('/api/v1/users/login', data)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       let token = res.data.data.token;
    //       localStorage.setItem('authTokens', JSON.stringify(token));
    //       setAuthTokens(token);
    //       // navigate.push('/');
    //     }
    //   })
    //   .catch((err) => {
    //     setErrors({
    //       submit: 'Email or password is incorrect, please try again!',
    //     });
    //     console.error(err);
    //   });
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
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
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
